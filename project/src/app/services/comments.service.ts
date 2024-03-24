import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) { }


  getComments(){
    const { apiUrl} = environment;
    return this.http.get<Comment[]>(`${apiUrl}/data/posts`)
    
  }
}
