import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subscriber } from '../types/subscriber'
import { Book } from '../types/book'
import { Comment } from 'src/app/types/comment';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllBooks() {
    const { apiUrl } = environment;
    return this.http.get<Book[]>(`${apiUrl}/data/books`)
  }

  getOneBook(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Book>(`${apiUrl}/data/books/${id}`)
  }

  createBook(
    title: string,
    author: string,
    genre: string,
    pages: number,
    imageUrl: string,
    moreInfo: string
  ) {
    const { apiUrl } = environment;
    return this.http.post<{
      title: string,
      author: string,
      genre: string,
      pages: number,
      imageUrl: string,
      moreInfo: string,
      _id: string,
    }>(`${apiUrl}/data/books`, { title, author, genre, pages, imageUrl, moreInfo })

  }

  updateBook(bookData: Book, id: string
  ) {
    const { apiUrl } = environment;
    return this.http.put<Book>(`${apiUrl}/data/books/${id}`, bookData)
  }

  deleteBook(id: string) {
    const { apiUrl } = environment;
    return this.http.delete<Book>(`${apiUrl}/data/books/${id}`);
  }

  getOwnBooks(ownerId: string) {
    const { apiUrl } = environment;
    const queryString = encodeURIComponent(`_ownerId = "${ownerId}"`)
    return this.http.get<Book[]>(`${apiUrl}/data/books?where=${queryString}`)
  }


  //addSubscribersToBook(newSubscriber: Subscriber): Observable<Subscriber> {
  // const { apiUrl } = environment;
  // return this.http.post<Subscriber>(`${apiUrl}/data/subscribers`, newSubscriber)
  //}


  //postComment(newComment: Comment): Observable<Comment> {
  // const { apiUrl } = environment;
  // return this.http.post<Comment>(`${apiUrl}/data/posts`, newComment)
  //}

}
