import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: Card[];

  constructor(private cardService: CardService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if(this.tokenStorage.getToken() == null){
      this.router.navigate(['login']);

    }else{
      this.getCards();
    }
  }

  getCards(): void {
    this.cardService.getCards()
    .subscribe(cards => this.cards = cards);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.cardService.addCard({ name } as Card)
      .subscribe(card => {
        this.cards.push(card);
      });
  }

}