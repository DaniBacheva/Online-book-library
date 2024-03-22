import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Book } from '../types/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  booksList: Book[] | null = null;
   
  constructor (private apiService: ApiService,
    private router: Router ) {}

    ngOnInit(): void {
      this.apiService.getAllBooks().subscribe( {
        next:(books) => {
          this.booksList = books.slice(-3);
           console.log(this.booksList)
        },
        error: (err)=> {
           console.log(err);
        }
       
      })
    }
  
}
