import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { Subscriber } from 'src/app/types/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

    private subscribersData$$ = new BehaviorSubject<Subscriber[]>([]);
    subscribers$ = this.subscribersData$$.asObservable();

  constructor(private http:HttpClient) { }

  getSubscribers(): void{
    const { apiUrl} = environment;
    this.http.get<Subscriber[]>(`${apiUrl}/data/subscribers`).subscribe((subscribers => {
        this.subscribersData$$.next(subscribers);
    }))
    
  }

  addSubscriber( newSubscriber: Subscriber ) {
    const currentSubscribers = this.subscribersData$$.getValue();
    this.subscribersData$$.next([...currentSubscribers, newSubscriber])
  }
    
  
}
