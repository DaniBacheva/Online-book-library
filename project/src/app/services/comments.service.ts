import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Comment } from 'src/app/types/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService  implements OnDestroy{
  private subscription: Subscription = new Subscription();

    private commentsData$$ = new BehaviorSubject<Comment[]>([]);
    comments$ = this.commentsData$$.asObservable();

  constructor(private http:HttpClient) { }


  getComments(): void{
    const { apiUrl} = environment;
    this.subscription = this.http.get<Comment[]>(`${apiUrl}/data/posts`).subscribe((comments => {
        this.commentsData$$.next(comments);
    }))
      }

  addComment( newComment: Comment ) {
    const currentComments = this.commentsData$$.getValue();
    this.commentsData$$.next([...currentComments, newComment])
  }

  postComment(newComment: Comment){
    const { apiUrl } = environment;
    return this.http.post<Comment>(`${apiUrl}/data/posts`, newComment)
  }

  getCommentsForBook( bookId: string) {
    const { apiUrl } = environment;
    const queryString = encodeURIComponent(`bookId = "${bookId}"`)
    return this.http.get<Comment[]>(`${apiUrl}/data/posts?where=${queryString}`)
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
