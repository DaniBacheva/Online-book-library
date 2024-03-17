import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { CurrentBookComponent } from './current-book/current-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BooksRoutingModule } from './books-routing.module';
import { FormsModule } from '@angular/forms';
import { NewBookComponent } from './new-book/new-book.component';



@NgModule({
  declarations: [
    BookListComponent,
    CurrentBookComponent,
    EditBookComponent,
    NewBookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule
  ], 
  exports: [
    BookListComponent,
    NewBookComponent,
    CurrentBookComponent,
    EditBookComponent

  ]
})
export class BooksModule { }
