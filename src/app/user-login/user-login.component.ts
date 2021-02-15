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
  role: string = "";

  constructor(private userService:UserService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.userService.loginUser(username, password).subscribe(
      data => {
        console.log(data);
        if(data!='700' && data!='600'){
          this.tokenStorage.saveToken(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          console.log(this.tokenStorage.getRole().role);
          this.goToDashboard();
        }
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
