import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { CurrentBookComponent } from './current-book/current-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';



@NgModule({
  declarations: [
    BookListComponent,
    CurrentBookComponent,
    EditBookComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BooksModule { }
