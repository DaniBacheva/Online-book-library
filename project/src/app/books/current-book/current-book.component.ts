import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Book } from 'src/app/types/book';
import { Comment } from 'src/app/types/comment';

@Component({
  selector: 'app-current-book',
  templateUrl: './current-book.component.html',
  styleUrls: ['./current-book.component.css']
})
export class CurrentBookComponent implements OnInit {
  book: Book | undefined;
  currentBookComments: Comment[] = [];
  newComment: Comment | undefined;
  comment: Comment | undefined;
  allComments: Comment[] = [];
  comments: Comment[] = [];
  commentText: string = ''


  constructor(
    private apiService: ApiService,
    private commentService: CommentsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getBookById();
    this.loadComments();
  }

  getBookById(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];
    this.apiService.getOneBook(id).subscribe((book) => {
      this.book = book;
      console.log(book)
    })
  }

  loadComments(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];

    this.commentService.getComments();
    this.commentService.comments$.subscribe((comments) => {
      //this.allComments=comments;
      console.log(comments)
      if (bookId) {
        console.log(bookId)
        console.log(this.comment?.bookId)
        this.currentBookComments = comments.filter(comment => comment.bookId === bookId);
        console.log(this.currentBookComments)
      }
      else {
        this.currentBookComments = []
      }
    }
    )
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
      username: userName ? userName : undefined
    }

    if (bookId) {
      this.apiService.postComment(newComment).subscribe({
        next: (response) => {
          form.resetForm();
          this.commentService.addComment(response);

        },
        error: (error) => {
          console.log('Error', error)
        }
      })
    }

    //this.commentService.addComment(text)
    console.log(form.value)
  }


}


