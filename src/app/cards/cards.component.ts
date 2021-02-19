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
  card:Card;
  isAdmin:boolean;

  constructor(private cardService: CardService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if(this.tokenStorage.getToken() == null){
      this.router.navigate(['login']);

    }else{
      this.getCards();
      if(this.tokenStorage.getRole().role == "Administrator"){
        this.isAdmin = true;
      }
    }
  }

  getCards(): void {
    this.cardService.getCards()
    .subscribe(cards => this.cards = cards);
  }

  add(name: string, description:string): void {
    this.card = <Card>{name:name.trim(), description:description.trim(),userWhoPostedIt:""};
    
    if (!name&&!description) { return; }
    this.cardService.addCard(this.card)
      .subscribe(data => {
        this.reloadPage();
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

}