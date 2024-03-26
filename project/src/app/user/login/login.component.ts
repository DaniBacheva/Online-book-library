import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }

  login(form: NgForm): void {
    if (form.invalid) {
      console.log('Form is invalid')
      return;
    }

    const { email, password } = form.value;
    this.userService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/books'])
      },
      error: (error) => {
        console.error("Login failed", error)

      }
    })
  }
}
