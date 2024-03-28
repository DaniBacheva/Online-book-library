import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-no-authenticated',
  templateUrl: './no-authenticated.component.html',
  styleUrls: ['./no-authenticated.component.css']
})
export class NoAuthenticatedComponent implements OnInit{
  isLoggedIn = false;

  constructor(private userService: UserService, private router:Router){}
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      console.log("dsadsasd",this.isLoggedIn);
      // Допълнителна логика въз основа на статуса
    });

    this.isLoggedIn = this.userService.isLogged;
    if(this.isLoggedIn) {
      this.router.navigate(['/'])
    }
  }
}