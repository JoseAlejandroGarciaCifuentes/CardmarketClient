import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Card } from './card';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class CardService {

  private getAll = 'http://localhost/Laravel/cardmarket/public/api/cards/all';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.getAll)
      .pipe(
        tap(_ => this.log('fetched cards')),
        catchError(this.handleError<Card[]>('getCards', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  /*getCardNo404<Data>(id: number): Observable<Card> {
    const url = `${this.cardsByNameURL}/?id=${id}`;
    return this.http.get<Card[]>(url)
      .pipe(
        map(cards => cards[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} card id=${id}`);
        }),
        catchError(this.handleError<Card>(`getCard id=${id}`))
      );
  }*/

  /** GET card by id. Will 404 if id not found */
  getCard(name: string): Observable<Card> {
    const url = `${this.getAll}/${name}`;
    return this.http.get<Card>(url).pipe(
      tap(_ => this.log(`fetched card name=${name}`)),
      catchError(this.handleError<Card>(`getCard name=${name}`))
    );
  }

  /* GET cards whose name contains search term */
  searchCards(term: string): Observable<Card[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Card[]>(`${this.getAll}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found cards matching "${term}"`) :
         this.log(`no cards matching "${term}"`)),
      catchError(this.handleError<Card[]>('searchCards', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.getAll, card, this.httpOptions).pipe(
      tap((newCard: Card) => this.log(`added card w/ id=${newCard.id}`)),
      catchError(this.handleError<Card>('addCard'))
    );
  }


  /** PUT: update the card on the server */
  updateCard(card: Card): Observable<any> {
    return this.http.put(this.getAll, card, this.httpOptions).pipe(
      tap(_ => this.log(`updated card id=${card.id}`)),
      catchError(this.handleError<any>('updateCard'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CardService: ${message}`);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/