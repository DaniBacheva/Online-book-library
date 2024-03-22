import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-current-book',
  templateUrl: './current-book.component.html',
  styleUrls: ['./current-book.component.css']
})
export class CurrentBookComponent implements OnInit{
  book: Book | undefined ;

  constructor(
    private apiService: ApiService, 
    private activatedRoute:ActivatedRoute ) {}
    
  ngOnInit(): void {
    this.getBookById()
  }

  getBookById(): void {
    const id= this.activatedRoute.snapshot.params['bookId']
    this.apiService.getOneBook(id).subscribe((book)=> {
      this.book=book;
      console.log(book)
    })
  }

}
