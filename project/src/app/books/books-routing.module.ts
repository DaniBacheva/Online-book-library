import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { CurrentBookComponent } from './current-book/current-book.component';
import { NewBookComponent } from './new-book/new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';


const routes: Routes = [
    {
        path: 'books',
        children: [
            { path: '', pathMatch: 'full', component: BookListComponent },
            { path: ':bookId', component: CurrentBookComponent }
        ],
    },
    {
        path: 'new-book', component: NewBookComponent

    },
    {
        path: 'edit-book', component:EditBookComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule { }