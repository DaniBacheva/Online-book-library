import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit{
  isAuthenticating = true;

  constructor (private userService: UserService,
    private router: Router) {}

    ngOnInit(): void {
      this.userService.getProfile().subscribe ({
      next: ()=> {
        this.isAuthenticating = false;
        },
        error: ()=> {
          this.isAuthenticating = false;
          },
          complete: ()=> {
            this.isAuthenticating= false;
            },
    })
    }
}







  
    
  






