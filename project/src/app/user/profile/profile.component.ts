import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/types/book';
import { UserService } from '../user.service';
import { User } from 'src/app/types/user';
import { SubscriberService } from 'src/app/services/subscribers.service';
import { Subscriber } from 'src/app/types/subscriber';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 myBooks: Book[]=[];
user: User | undefined;
userId:string | undefined;
mySubBooks: Subscriber[]=[]

 constructor(
  private apiService: ApiService,
  private userService: UserService,
  private subService: SubscriberService) {}

ngOnInit(): void {
  this.getOwnBooks();
  this.getProfile();
  this.loadSubscribers()
}

getProfile():void {
  this.userService.getProfile().subscribe({
    next: (user)=> {
      this.user=user;
      console.log(user)
    },
    error: (error) =>{
      console.log('Error', error)
    }
  })
};

loadSubscribers(): void {
  const userId = localStorage.getItem('userId');
  this.subService.getSubscribers();
  this.subService.subscribers$.subscribe((subscribers) => {
    console.log(subscribers);
    this.mySubBooks = subscribers.filter(subscriber => subscriber.userId === userId)

})
}

getOwnBooks(): void {
   const userId = localStorage.getItem('userId')
   this.apiService.getAllBooks().subscribe({
    next: (books) => {
    this.myBooks = books.filter(book => book._ownerId === userId)
    console.log(this.userId)
    console.log(this.myBooks)
  },
  error: (error) =>{
    console.log('Error', error)
  }
   })
};
 
}
