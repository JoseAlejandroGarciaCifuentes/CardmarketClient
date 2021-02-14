import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user:User;

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
  }

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.user.email = "angular@gmail.com";
    this.user.password = "1234";
    this.user.role = "Individual";
    this.user.username = "angular";
    
    /*this.userService.registerUser("angular", "1234", "angular@gmail.com", "Individual").subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );*/
    
  }
}