import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  cards: Card[];

  constructor(private cardService: CardService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if(!this.tokenStorage.getToken()){
      this.router.navigate(['login']);

    }else{
      this.getCards();
    }
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards.slice(0, 5));
  }
}