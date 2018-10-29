import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Hero} from './hero';

@Injectable({providedIn: 'root'})
export class InMemoryDataService implements InMemoryDbService {

  private heroesUrl = 'api/heroes';

  createDb() {
    const heroes = [
      {
        id: 1,
        name: 'spider man'
      }, {
        id: 2,
        name: 'iron man'
      }, {
        id: 3,
        name: 'superman'
      }, {
        id: 4,
        name: 'red soldier'
      }, {
        id: 5,
        name: 'thor'
      }, {
        id: 6,
        name: 'batman'
      }, {
        id: 7,
        name: 'dr. strange'
      }, {
        id: 8,
        name: 'flash'
      }, {
        id: 9,
        name: 'daredevil'
      }, {
        id: 10,
        name: 'punisher'
      }, {
        id: 11,
        name: 'wolverine'
      }, {
        id: 12,
        name: 'batman beyond'
      }
    ]
    return {heroes};
  }
  genId = (heroes : Hero[]) : number => heroes.length > 0
    ? Math.max(...heroes.map(hero => hero.id + 1))
    : 11;

}
