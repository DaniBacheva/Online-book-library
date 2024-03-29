import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { CommentsService } from 'src/app/services/comments.service';
import { SubscriberService } from 'src/app/services/subscribers.service';
import { Book } from 'src/app/types/book';
import { Comment } from 'src/app/types/comment';
import { Subscriber } from 'src/app/types/subscriber';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-book',
  templateUrl: './current-book.component.html',
  styleUrls: ['./current-book.component.css']
})
export class CurrentBookComponent implements OnInit {
  book: Book | undefined;
  isOwner: boolean = false;
  allSubscribers: Subscriber[] = [];
  subscriberforCurrentBook: Subscriber[] = [];
  hasSubscribed: boolean = false;
  currentBookComments: Comment[] = [];

  constructor(
    private apiService: ApiService,
    private commentService: CommentsService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private subService: SubscriberService
  ) { }

  ngOnInit(): void {
    this.getBookById();
    this.loadComments();
    this.loadSubscribers()
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  getBookById(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];
    this.apiService.getOneBook(id).subscribe({
      next:(book) => {
      this.book = book;
      console.log(book);

      const userId = localStorage.getItem('userId');
      this.isOwner = book._ownerId === userId
      console.log(this.isOwner);
      },
      error: (error) => {
        console.log('Error', error)
      }
    })
  }

  loadComments(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];

    this.commentService.getComments();
    this.commentService.comments$.subscribe({
      next:(comments) => {
      console.log(bookId)
      this.currentBookComments = comments.filter(comment => comment.bookId === bookId);
      console.log(this.currentBookComments)
      },
      error: (error) => {
        console.log('Error', error)
      }
    })
  }

  commentAdd(form: NgForm): void {
    if (form.invalid) {
      return
    }
    let { commentText } = form.value;
    const userName = localStorage.getItem('username');
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    const newComment: Comment = {
      commentText: commentText,
      bookId: bookId,
      username: userName ? userName : undefined,
    }

    this.commentService.postComment(newComment).subscribe({
      next: (response) => {
        form.resetForm();
        this.commentService.addComment(response);
      },
      error: (error) => {
        console.log('Error', error)
      }
    })
  }

  loadSubscribers() {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    console.log(bookId);
    const userId = localStorage.getItem('userId');
    this.subService.getSubscribers();
    this.subService.subscribers$.subscribe({
      next: (subscribers) => {

        console.log(subscribers);

        this.allSubscribers = subscribers.filter(subscriber => subscriber.bookId === bookId)
        console.log(this.allSubscribers)
        this.subscriberforCurrentBook = this.allSubscribers.filter(subscriber => subscriber.userId === userId);
        console.log(this.subscriberforCurrentBook.length);

        if (this.subscriberforCurrentBook.length > 0) {
          this.hasSubscribed = true;
        }
        else {
          this.hasSubscribed = false;
        }
      },
      error: (error) => {
        console.log('Error', error)
      }
    }) 
  }

  addSubscribers() {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    const userId = localStorage.getItem('userId');

    const newSubscriber: Subscriber = {
      userId: userId!,
      bookId: bookId
    };
    this.subService.addSubscribersToBook(newSubscriber).subscribe({
      next: (response) => {
        this.subService.addSubscriber(response);
      },
      error: (error) => {
        console.log('Error', error)
      }
    })
  }
}


