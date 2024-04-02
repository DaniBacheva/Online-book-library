import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/types/comment';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  currentBookComments: Comment[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private commentService: CommentsService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadComments();

  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  loadComments(): void {

    const bookId = this.activatedRoute.snapshot.params['bookId'];

    this.subscription.add(
      this.commentService.getCommentsForBook(bookId!).subscribe({
        next: (comments) => {
          console.log(comments);
          this.currentBookComments = comments
        },
        error: (error) => {
          console.log('Error', error)
        }
      }))
  }

  commentAdd(form: NgForm): void {
    if (form.invalid) {
      return
    }
    let { text } = form.value;
    const userName = localStorage.getItem('username');
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    const newComment: Comment = {
      commentText: text,
      bookId: bookId,
      username: userName ? userName : undefined,
    }

    this.subscription.add(
    this.commentService.postComment(newComment).subscribe({
      next: (response) => {
        form.resetForm();
        this.commentService.addComment(response);
        this.loadComments()
      },
      error: (error) => {
        console.log('Error', error)
      }
    }))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
