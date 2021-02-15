import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private router:Router;

    constructor() { }

    goToLogin() {
        this.router.navigate(['login']);
      }
}
