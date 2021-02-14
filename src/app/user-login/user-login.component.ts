import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { User } from '../user';
import { UserService } from '../user.service';
import { TokenStorageService } from '../token-storage.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private userService:UserService, private router: Router/*private authService: AuthService*/, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    
  }
  ngOnDestroy(): void {
    sessionStorage.clear();
}

  onSubmit(): void {
    const { username, password } = this.form;

    this.userService.loginUser(username, password).subscribe(
      data => {
        console.log(data);
        if(data!='700' && data!='600'){
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          //this.reloadPage();
          this.goToDashboard();
        }
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
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

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
