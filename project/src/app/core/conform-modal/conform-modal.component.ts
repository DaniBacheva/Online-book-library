import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-conform-modal',
  templateUrl: './conform-modal.component.html',
  styleUrls: ['./conform-modal.component.css']
})
export class ConformModalComponent implements OnDestroy {
  //book:Book | undefined ;
  book$: Observable<Book>

  private subscription: Subscription = new Subscription();

  constructor(
    private apiService: ApiService, 
    private activatedRoute:ActivatedRoute,
    private router: Router ) {

      const id= this.activatedRoute.snapshot.params['bookId'];
      this.book$ = this.apiService.getOneBook(id)
    }
    
   //getBookById(): void {
  //  const id= this.activatedRoute.snapshot.params['bookId'];
  //  this.subscription.add(
  //  this.apiService.getOneBook(id).subscribe({
   //   next:(book)=> {
   //   this.book=book;
   //   console.log(book)
    //  },
    //  error: (error)=> {
    //    console.log('Delete error', error)
    //  }
   // })
   // )
  //}

  deleteHandler(){
    const id= this.activatedRoute.snapshot.params['bookId'];
    this.subscription= this.apiService.deleteBook(id).subscribe({
      next:()=> {
        console.log("Book has been deleted!");
        this.router.navigate(['/books'])
      },
      error: (error)=> {
        console.log('Delete error', error)
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

