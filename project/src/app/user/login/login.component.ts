import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{

  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService, private router: Router) { }

  login(form: NgForm): void {
    if (form.invalid) {
      console.log('Form is invalid')
      return;
    }

    const { email, password } = form.value;
    this.subscription = this.userService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/books'])
      },
      error: (error) => {
        console.error("Login failed", error)

      }
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
