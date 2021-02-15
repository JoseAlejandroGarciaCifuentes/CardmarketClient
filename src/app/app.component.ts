import { Component } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cardmarket';

  constructor(private tokenStorage: TokenStorageService){}

  ngOnDestroy(): void {
    this.tokenStorage.signOut();
  }
  
}
