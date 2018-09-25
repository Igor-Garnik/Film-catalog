import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor() { }

  isUploaded$ = new Subject<boolean>();

  setUploaded(isUploaded): void {
    this.isUploaded$.next(isUploaded)
  }

  getUploaded(): Observable<boolean> {
    return this.isUploaded$.asObservable();
  }
}
