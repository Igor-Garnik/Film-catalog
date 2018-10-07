import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  page$ = new Subject<number>();
  isUploaded$ = new Subject<boolean>();
  query$ = new Subject<any>();
  state$ = new Subject<any>();

  scrorollToTop(): void {
    window.scrollTo(0, 0);
  }

  setPage(page): void {
    this.page$.next(page)
  }

  getPage(): Observable<number> {
    return this.page$.asObservable();
  }

  setIsUploaded(isUploaded): void {
    this.isUploaded$.next(isUploaded);
  }

  getIsUploaded(): Observable<boolean> {
    return this.isUploaded$.asObservable();
  }

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

  checkParam(param: string, kindOfFilmsList: string): string {
    return param !== null ? param : kindOfFilmsList;
  }

  findExactOccurrence(list, query: string, title): any {
    return list.filter(item => {
      return item[title].toLowerCase().substring(0, query.length).includes(query.toLowerCase().trim())
    })
  }

}


