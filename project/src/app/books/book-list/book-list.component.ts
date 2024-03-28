import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../../types/book'
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  // booksList: Book[] | null = null;
  books$: Observable<Book[]>

  constructor(private apiService: ApiService) {
    this.books$ = this.apiService.getAllBooks()
  }

  // ngOnInit(): void {
  //   this.apiService.getAllBooks().subscribe( {
  //     next:(books) => {
  //      this.booksList = books;
  //       console.log(books)
  //     },
  //    error: (err)=> {
  //       console.log(err);
  //    }
  //  })
}



