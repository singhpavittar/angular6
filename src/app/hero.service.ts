import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({providedIn: 'root'})
export class HeroService {

  constructor(private http : HttpClient, private messageService : MessageService) {}

  private heroesUrl = 'api/heroes';

  getHeroes = () : Observable < Hero[] > => {
    // TODO: send the message _after_ fetching the heroes
    this
      .messageService
      .add('HeroService: fetched heroes');
    return this.http.get < Hero[] > (this.heroesUrl).pipe(catchError(this.handleError('getHeroes', [])));
  }

  getHero = (id : number) : Observable < Hero > => {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get < Hero > (url).pipe(tap(_ => this.log(`fetched hero id=${id}`)), catchError(this.handleError < Hero > (`getHero id=${id}`)))
  }

  updateHero = (hero : Hero) : Observable < Hero > => this
    .http
    .put(this.heroesUrl, hero, httpOptions)
    .pipe(tap(_ => this.log(`updated hero id=${hero.id}`)), catchError(this.handleError < any > ('updatedHero')))

  addHero = (hero : Hero) : Observable < Hero > => this.http.post < Hero > (this.heroesUrl, hero, httpOptions).pipe(tap((hero : Hero) => this.log(`added hero w/ id=${hero.id}`)), catchError(this.handleError < Hero > ('add hero')))

  deleteHero = (hero : Hero | number) : Observable < Hero > => {
    const id = typeof hero === 'number'
      ? hero
      : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete < Hero > (url, httpOptions).pipe(tap(_ => this.log(`deleted hero id = ${id}`)), catchError(this.handleError < Hero > ('delete hero')));
  }

  searchHeroes = (term : string) : Observable < Hero[] > => {
    const url = `${this.heroesUrl}?name=${term}`;
    return this.http.get < Hero[] > (url).pipe(tap(_ => this.log(`fetched hero name ${term}`)), catchError(this.handleError(`get heroes with name ${term}`, [])))
  }

  private log = (message : string) => this
    .messageService
    .add(`HeroService ${message}`);

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError < T > (operation = 'operation', result?: T) {
    return(error : any): Observable < T > => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
