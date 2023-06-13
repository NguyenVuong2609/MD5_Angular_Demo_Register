import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SignUpForm} from '../../model/SignUpForm';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  status = '';
  form: any = {};
  hide = true;
  signUpForm = SignUpForm;
  emailFormValidate = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  register(): void {
    // @ts-ignore
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );
      // @ts-ignore
      this.authService.signup(this.signUpForm).subscribe(data => {
        if (data.message == 'no_user') {
          this.status = 'The username is existed! Please choose another username.';
        } else if (data.message == 'no_email') {
          this.status = 'The email is existed! Please choose another email.';
        } else {
          this.status = 'Create account successful!';
        }
      });
  }
}
