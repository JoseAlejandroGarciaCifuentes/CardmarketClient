import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Collection } from './collection';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class CollectionService {

  private getAll = 'http://localhost:8888/Laravel/cardmarket/public/api/collections/all';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

    /** GET heroes from the server */
  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.getAll)
      .pipe(
        tap(_ => this.log('fetched collections')),
        catchError(this.handleError<Collection[]>('getCollections', []))
      );
  }

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
