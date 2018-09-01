import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  query$ = new Subject<any>();
  state$ = new Subject<any>();

  setState(state: string): void {
    this.state$.next(state);
  }

  getState(): Observable<any> {
    return this.state$.asObservable();
  }

  setQuery(query: string): void {
    this.query$.next(query);
  }

  getQuery(): Observable<any> {
    return this.query$.asObservable();
  }

}
