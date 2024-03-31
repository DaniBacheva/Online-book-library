import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/types/comment';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  currentBookComments: Comment[] = [];

  constructor (
    private commentService: CommentsService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
       this.loadComments();
    
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  loadComments(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];

    //this.commentService.getComments();
    //this.commentService.comments$.subscribe({
    //  next:(comments) => {
    // console.log(bookId)
    //  this.currentBookComments = comments.filter(comment => comment.bookId === bookId);
    //   console.log(this.currentBookComments)
    //   },
    //   error: (error) => {
    //    console.log('Error', error)
    //  }
    // })

    this.commentService.getCommentsForBook(bookId!).subscribe({
      next: (comments) => {
        console.log(comments);
        this.currentBookComments = comments
      },
      error: (error) => {
        console.log('Error', error)
      }
    })
  }

  commentAdd(form: NgForm): void {
    if (form.invalid) {
      return
    }
    let { commentText } = form.value;
    const userName = localStorage.getItem('username');
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    const newComment: Comment = {
      commentText: commentText,
      bookId: bookId,
      username: userName ? userName : undefined,
    }

    this.commentService.postComment(newComment).subscribe({
      next: (response) => {
        form.resetForm();
        this.commentService.addComment(response);
        this.loadComments()
      },
      error: (error) => {
        console.log('Error', error)
      }
    })
  }
}
