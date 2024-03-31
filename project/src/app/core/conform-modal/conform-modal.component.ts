import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-conform-modal',
  templateUrl: './conform-modal.component.html',
  styleUrls: ['./conform-modal.component.css']
})
export class ConformModalComponent implements OnInit, OnDestroy {
  book:Book | undefined ;

  private subscription: Subscription = new Subscription();

  constructor(
    private apiService: ApiService, 
    private activatedRoute:ActivatedRoute,
    private router: Router ) {}
    
  ngOnInit(): void {
    this.getBookById()
  }

  getBookById(): void {
    const id= this.activatedRoute.snapshot.params['bookId'];
    this.subscription.add(
    this.apiService.getOneBook(id).subscribe({
      next:(book)=> {
      this.book=book;
      console.log(book)
      },
      error: (error)=> {
        console.log('Delete error', error)
      }
    })
    )
  }

  deleteHandler(){
    const id= this.activatedRoute.snapshot.params['bookId'];
    this.subscription.add(
      this.apiService.deleteBook(id).subscribe({
      next:()=> {
        console.log("Book has been deleted!");
        this.router.navigate(['/books'])
      },
      error: (error)=> {
        console.log('Delete error', error)
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

