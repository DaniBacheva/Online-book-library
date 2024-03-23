import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/types/book';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  bookDetails: Book | undefined

  form = this.fb.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required]],
    genre: ['', [Validators.required]],
    pages: [0, [Validators.required]],
    imageUrl: ['', [Validators.required]],
    moreInfo: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBookDetails()
  }

  loadBookDetails(): void {

    const id = this.activatedRoute.snapshot.params['bookId'];
    console.log(id)
    this.apiService.getOneBook(id).subscribe({
      next: (bookData) => {
        this.bookDetails = bookData;
        console.log(bookData)
      },
      error: (err) => {
        console.log(err);
      }
    })

    //const { title, author, genre, pages, imageUrl, moreInfo } = this.bookDetails;

     // this.form.setValue({
        //title, author, genre, pages, imageUrl, moreInfo
   //   })
  //  }

  }

  editBookHandler(): void {
    if (this.form.invalid){
      return;
    }
    const id = this.activatedRoute.snapshot.params['bookId'];
    console.log(id)
    const formData = {...this.form.value} as Book;
  

      this.apiService.updateBook(formData, id).subscribe(()=> console.log (this.bookDetails))
  }




};





