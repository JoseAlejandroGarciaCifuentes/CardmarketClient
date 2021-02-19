import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../card';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from '../card.service';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  card: Card;
  isAdmin:boolean;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private location: Location,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    
      this.getCard();
      if(this.tokenStorage.getRole().role == "Administrator"){
        this.isAdmin = true;
      }

  }

  getCard(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.cardService.getCard(name)
      .subscribe(card => this.card = card);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.cardService.updateCard(this.card)
      .subscribe(() => this.goBack());
  }

}
