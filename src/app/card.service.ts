import { Injectable } from '@angular/core';
import { Card } from './card';
import { CARDS } from './mock-cards';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private messageService: MessageService) { }

  /*
  getCards(): Card[] {
    return CARDS;
  }*/

  getCards(): Observable<Card[]> {
    const cards = of(CARDS);
    this.messageService.add('CardService: fetched cards');
    return cards;
  }

  getCard(id: number): Observable<Card> {
  // TODO: send the message _after_ fetching the card
    this.messageService.add(`CardService: fetched card id=${id}`);
    return of(CARDS.find(card => card.id === id));
  }
}
