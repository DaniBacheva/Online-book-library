import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-conform-modal',
  templateUrl: './conform-modal.component.html',
  styleUrls: ['./conform-modal.component.css']
})
export class ConformModalComponent {
  book:Book | undefined ;

  constructor(
    private apiService: ApiService, 
    private activatedRoute:ActivatedRoute,
    private router: Router ) {}
    
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

  deleteHandler(){
    const id= this.activatedRoute.snapshot.params['bookId'];
    this.apiService.deleteBook(id).subscribe({
      next:()=> {
        console.log("Book has been deleted!");
        this.router.navigate(['/books'])
      },
      error: (error: any)=> {
        console.log('Delete error', error)
      }
    })
  }
}

