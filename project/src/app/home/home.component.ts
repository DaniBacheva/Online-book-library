import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { Book } from '../types/book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  booksList: Book[] | null = null;

  constructor(private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.apiService.getAllBooks().subscribe({
      next: (books) => {
        this.booksList = books.slice(-3);
        console.log(this.booksList)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
