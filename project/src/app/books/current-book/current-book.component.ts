import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { SubscriberService } from 'src/app/services/subscribers.service';
import { Book } from 'src/app/types/book';
import { Comment } from 'src/app/types/comment';
import { Subscriber } from 'src/app/types/subscriber';
import { UserService } from 'src/app/user/user.service';
import { SlicePipe } from 'src/app/shared/pipes/slice.pipe';

@Component({
  selector: 'app-current-book',
  templateUrl: './current-book.component.html',
  styleUrls: ['./current-book.component.css']
})
export class CurrentBookComponent implements OnInit, OnDestroy {
  book: Book | undefined;
  isOwner: boolean = false;
  allSubscribers: Subscriber[] = [];
  subscriberforCurrentBook: Subscriber[] = [];
  hasSubscribed: boolean = false;
  currentBookComments: Comment[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private subService: SubscriberService
  ) { }

  ngOnInit(): void {
    this.getBookById();
    this.loadSubscribers()
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  getBookById(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];
    
    this.subscription.add(
    this.apiService.getOneBook(id).subscribe({
      next: (book) => {
        this.book = book;
        console.log(book);

        const userId = localStorage.getItem('userId');
        this.isOwner = book._ownerId === userId
        console.log(this.isOwner);
      },
      error: (error) => {
        console.log('Error', error)
      }
    }))
  }
 
  loadSubscribers() {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    console.log(bookId);
    const userId = localStorage.getItem('userId');
    this.subscription.add(
    this.subService.getBookSubscribers(bookId).subscribe({
      next: (subscribers) => {
        this.allSubscribers = subscribers;
        console.log(this.allSubscribers);
        
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
    }))
  }

  addSubscribers() {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    const userId = localStorage.getItem('userId');

    const newSubscriber: Subscriber = {
      userId: userId!,
      bookId: bookId
    };
    this.subscription.add(
    this.subService.addSubscribersToBook(newSubscriber).subscribe({
      next: (response) => {
        this.subService.addSubscriber(response);
        this.loadSubscribers()
      },
      error: (error) => {
        console.log('Error', error)
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}


