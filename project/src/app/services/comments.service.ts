import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { Comment } from 'src/app/types/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

    private commentsData$$ = new BehaviorSubject<Comment[]>([]);
    comments$ = this.commentsData$$.asObservable();

  constructor(private http:HttpClient) { }


  getComments(): void{
    const { apiUrl} = environment;
    this.http.get<Comment[]>(`${apiUrl}/data/posts`).subscribe((comments => {
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

    
  
}
