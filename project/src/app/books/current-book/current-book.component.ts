
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-current-book',
  templateUrl: './current-book.component.html',
  styleUrls: ['./current-book.component.css']
})
export class CurrentBookComponent implements OnInit {
  book: Book | undefined;
  currentBookComments: Comment[] = [];
  newComment: Comment | undefined;
  comment: Comment | undefined;
  allComments: Comment[] = [];
  comments: Comment[] = [];

  constructor(
    private apiService: ApiService,
    private commentService: CommentsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getBookById();
    this.loadComments();
  }

  getBookById(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];
    this.apiService.getOneBook(id).subscribe((book) => {
      this.book = book;
      console.log(book)
    })

  }

  loadComments(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];

    this.commentService.getComments().subscribe((comments: Comment[]) => {
      this.allComments=comments;
        if (id) {
          this.currentBookComments = this.allComments//.filter (comment=> comment._id===this.id);
        }
        else {
          this.currentBookComments = []
        }
      }
    )

  }

  commentAdd(form: NgForm): void {
    const id = this.activatedRoute.snapshot.params['bookId'];
    if (form.invalid) {
      return
    }
    const { name, text } = form.value;


  }

}
