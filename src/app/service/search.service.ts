import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Query } from '../models/query'

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  query$ = new Subject<Query>();
  state$ = new Subject<Query>();

  setQuery(query: Query): void {
    this.query$.next(query);
  }

  getQuery(): Observable<Query> {
    return this.query$.asObservable();
  }

}
