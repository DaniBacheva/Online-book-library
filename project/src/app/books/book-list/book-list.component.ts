import { Component, OnInit } from '@angular/core';
import { Book } from '../../types/book'
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  booksList: Book[] | null = null;

  constructor (private apiService: ApiService,
    private router: Router ) {}

    ngOnInit(): void {
      this.apiService.getAllBooks().subscribe( {
        next:(books) => {
          this.booksList = books;
          console.log(books)
        },
        error: (err)=> {
           console.log(err);
        }
       
      })
    }


}
