import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/validators/passwords-match';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ["", [Validators.required]],
    email: ["", [Validators.required]],
    passGroup: this.fb.group({
      password: ["", [Validators.required]],
      rePassword: ["", [Validators.required]],
    },
      {
        Validators: [passwordMatchValidator("password", "rePassword")]
      }
    ),

  })

  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router) { }

  register() {
    if (this.form.invalid) {
      return
    }
    const {
      username,
      email,
      passGroup: { password, rePassword } = {}
    } = this.form.value;

    console.log(this.form.value)
    this.userService.register(email!, username!, password).subscribe(() => {
      console.log(this.form.value);
      this.router.navigate(['/books'])
    })
  }
}
