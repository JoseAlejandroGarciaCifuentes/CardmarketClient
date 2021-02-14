import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user:User;

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private userService:UserService, private router: Router/*private authService: AuthService, private tokenStorage: TokenStorageService*/) { }

  ngOnInit(): void {
    /*if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }*/

    this.user = <User>{email:"", password:"", role:"Individual", username:""};

    console.log('hola');
    this.user.email = "anguladrOBJ@gmail.com";
    this.user.password = "1234";
    this.user.username = "asngularOBJ";
    this.userService.registerUser(this.user).subscribe(data => {
      console.log(data);
    },
    err => {
      this.errorMessage = err.error.message;
    }
    );
  }

  onSubmit(): void {
    const { username, password } = this.form;

    /*this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );*/
  }

  goToItems() {
    this.router.navigate(['dashboard']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
