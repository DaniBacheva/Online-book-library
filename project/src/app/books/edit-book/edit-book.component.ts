import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/types/book';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit , OnDestroy{

  bookDetails: Book | undefined = undefined;
  private subscription: Subscription = new Subscription();

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
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadBookDetails()
  }

  loadBookDetails(): void {

    const id = this.activatedRoute.snapshot.params['bookId'];
    console.log(id);
    this.subscription.add(
      this.apiService.getOneBook(id).subscribe({
        next: (bookData) => {
          this.bookDetails = bookData;
          const { title, author, genre, pages, imageUrl, moreInfo } = bookData;
          this.form.setValue({
            title, author, genre, pages, imageUrl, moreInfo
          })
          console.log(bookData)
        },
        error: (err) => {
          console.log(err);
        }
      }))
  }

  editBookHandler(): void {
    if (this.form.invalid) {
      return;
    }
    const id = this.activatedRoute.snapshot.params['bookId'];
    console.log(id)
    const formData = { ...this.form.value } as Book;

    this.subscription.add(
      this.apiService.updateBook(formData, id).subscribe({
        next: () => {
          console.log(formData);
          this.router.navigate(['/books'])
        },
        error: (err) => {
          console.log(err);
        }
      }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
};





