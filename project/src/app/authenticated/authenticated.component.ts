import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit{
  isLoggedIn = false;

  constructor (private userService: UserService,
    private router: Router) {}

    ngOnInit(): void {
      this.isLoggedIn=this.userService.isLogged;
      if (!this.isLoggedIn) { 
        this.router.navigate(['/auth/login'])
      }
    }
}
