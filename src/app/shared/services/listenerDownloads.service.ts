import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerDownloadsService {

  constructor() { }

  isUploaded$ = new Subject<boolean>();

  setIsUploaded(isUploaded): void {
    this.isUploaded$.next(isUploaded)
  }

  getIsUploaded(): Observable<boolean> {
    return this.isUploaded$.asObservable();
  }
}
