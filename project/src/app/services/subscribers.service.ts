import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { Subscriber } from 'src/app/types/subscriber';
import { Book } from 'src/app/types/book';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService implements OnDestroy {
  private subscription: Subscription = new Subscription();

    private subscribersData$$ = new BehaviorSubject<Subscriber[]>([]);
    subscribers$ = this.subscribersData$$.asObservable();

  constructor(private http:HttpClient) { 

  }

  getSubscribers(): void{
    const { apiUrl} = environment;
    this.subscription=this.http.get<Subscriber[]>(`${apiUrl}/data/subscribers`).subscribe((subscribers => {
        this.subscribersData$$.next(subscribers);
    }))
   
  }

   addSubscriber( newSubscriber: Subscriber ) {
    const currentSubscribers = this.subscribersData$$.getValue();
    this.subscribersData$$.next([...currentSubscribers, newSubscriber])
  }

  addSubscribersToBook(newSubscriber: Subscriber){
    const { apiUrl } = environment;
    return this.http.post<Subscriber>(`${apiUrl}/data/subscribers`, newSubscriber)
  }

  mySubscriptions(userId: string){
    const { apiUrl } = environment;
    const queryString = encodeURIComponent(`userId = "${userId}"`)
    return this.http.get<Subscriber[]>(`${apiUrl}/data/subscribers?where=${queryString}`)
  }

  getBookSubscribers(bookId: string) {
    const { apiUrl } = environment;
    const queryString = encodeURIComponent(`bookId = "${bookId}"`)
    return this.http.get<Subscriber[]>(`${apiUrl}/data/subscribers?where=${queryString}`)
  } 

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  
}
