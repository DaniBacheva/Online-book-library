import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { CurrentBookComponent } from './current-book/current-book.component';
import { NewBookComponent } from './new-book/new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ConformModalComponent } from '../core/conform-modal/conform-modal.component';


const routes: Routes = [
    {
        path: 'books',
        children: [
            { path: '', pathMatch: 'full', component: BookListComponent },
            {
                path: ':bookId',
                children: [
                    { path: '', pathMatch: 'full', component: CurrentBookComponent },
                    { path: 'edit-book', component: EditBookComponent },
                    { path: 'delete-book', component: ConformModalComponent}, 
                ]
            }
        ],
    },
    {
        path: 'new-book', component: NewBookComponent

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule { }