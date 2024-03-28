import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { passwordsMatch } from '../../shared/utils/passwordsMatch';
import { emailValidator} from '../../shared/utils/email-validator'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(4)]],
    email: ["", [Validators.required, emailValidator()]],
    passGroup: this.fb.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      rePassword: ["", [Validators.required]],
    },
      {
        validators: [passwordsMatch("password", "rePassword")]
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
   // this.userService.register( username!, email!, password).subscribe({
    //  next: ()=> {
    //    console.log(this.form.value);
   //   this.router.navigate(['/books'])
   //   },
   //   error: (error)=> {
   //     console.error("Registration failed", error)
   //   }
      
 //   })
  }
}
