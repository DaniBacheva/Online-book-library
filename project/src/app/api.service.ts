import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Book} from './types/book'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor (private http:HttpClient){}



  getAllBooks () {
    const URL= 'http://localhost:3030/jsonstore'
    return this.http.get<Book>(`${URL}/teams`)

    
  }

  getOneBook (id:string){


  }

  createBook ( 
    title: string,
    author: string, 
    genre: string, 
    pages:number, 
    imageUrl: string, 
    moreInfo: string 
    ){
     // const URL= 'http://localhost:3030/jsonstore'
 //     return this.http.post<Book>(
  //      `${URL}/books`, 
 //    body:JSON.stringify(title, author, genre, pages, imageUrl, moreInfo))

  }

  getLatestPost (limit:number) {


  }




}
