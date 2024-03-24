
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent {

  constructor(private apiService: ApiService, private router: Router) { }

  newBookHandler(form: NgForm): void {
    console.log(form.value)

    if (form.invalid) {
      return
    }

    const { title, author, genre, pages, imageUrl, moreInfo } = form.value;
    this.apiService.createBook(title, author, genre, pages, imageUrl, moreInfo).subscribe(() => {
      console.log(form.value)
     this.router.navigate(['/books'])
    })

  }
}
