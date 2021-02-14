import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user:User = <User>{email:"", password:"", role:"Individual", username:""};

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private userService:UserService/*private authService: AuthService*/) { }

  ngOnInit(): void {
    //this.user = <User>{email:"", password:"", role:"Individual", username:""};
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    console.log(email);
    this.user.email = email;
    this.user.password = password;
    this.user.username = username;
    
    this.userService.registerUser(this.user).subscribe(data => {
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    }
    );
    
  }
}