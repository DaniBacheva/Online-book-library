import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/types/book';
import { UserService } from '../user.service';
import { User } from 'src/app/types/user';
import { SubscriberService } from 'src/app/services/subscribers.service';
import { Subscriber } from 'src/app/types/subscriber';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  //myBooks: Book[] = [];
  //user: User | undefined;
  userId: string = '';
  mySubBooks: Subscriber[] = []
  myBooks$: Observable<Book[]>
  me$: Observable<User>

  private subscription: Subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private subService: SubscriberService) {

    const userId = localStorage.getItem('userId');
    this.myBooks$ = this.apiService.getOwnBooks(userId!)
    this.me$ = this.userService.getProfile()
  }

  ngOnInit(): void {
    this.loadSubscribers()
    // this.getOwnBooks();
    //this.getProfile();
  }

  loadSubscribers(): void {
    const userId = localStorage.getItem('userId');

    console.log(userId)
    this.subscription = this.subService.mySubscriptions(userId!).subscribe({
      next: (subscribers) => {
        console.log(subscribers);
        this.mySubBooks = subscribers;

      },
      error: (error) => {
        console.log('Error', error)
      }
    })
  }

  //getProfile(): void {
  //  this.subscription.add(
  //  this.userService.getProfile().subscribe({
  //    next: (user) => {
  //      this.user = user;
  //     console.log(user)
  //   },
  //   error: (error) => {
  //     console.log('Error', error)
  //   }
  //  }))
  //};


  //getOwnBooks(): void {
  // this.apiService.getOwnBooks(userId!).subscribe({
  //   next: (books) => {
  //     console.log(books);
  //     this.myBooks = books
  //   },
  //   error: (error) => {
  //    console.log('Error', error)
  /// })
  //};

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
