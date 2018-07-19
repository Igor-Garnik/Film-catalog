import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkApiService {
  localApiUrl: string = 'http://localhost:3000';
  bookmarkApiUrl: string = `${this.localApiUrl}/films/bookmarks`;

  constructor(private http: HttpClient) { }

  getBookmarks(bookmarkIds: Array<number>) {
    return this.http.get(`${this.bookmarkApiUrl}?bookmarkIds=${bookmarkIds.join(',')}`);
  }

  addToBookmarks(id: number) {
    return this.http.post(this.bookmarkApiUrl, { filmId: id });
  }

  removeFromBookmarks(id: number) {
    return this.http.delete(`${this.localApiUrl}/films/${id}/bookmarks`);
  }
}
