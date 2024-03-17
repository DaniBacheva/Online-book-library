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
  books: Book[] | null = [];

  constructor (private apiService: ApiService,
    private router: Router ) {}

    ngOnInit(): void {
      this.apiService.getAllBooks().subscribe((books) => {
        console.log(books);
      })
    }


}
