import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bookmark } from './../models/bookmark';
import { Film } from './../models/film';

@Injectable({
  providedIn: 'root'
})
export class BookmarkApiService {
  localApiUrl: string = 'http://localhost:3000';
  bookmarkApiUrl: string = `${this.localApiUrl}/films/bookmarks`;

  constructor(private http: HttpClient) { }

  getBookmarks(filmIds: Array<number>) {
    return this.http.get(`${this.bookmarkApiUrl}?filmIds=${filmIds.join(',')}`);
  }

  addToBookmarks(id: number) {
    return this.http.post(this.bookmarkApiUrl, { filmId: id });
  }

  removeFromBookmarks(id: number) {
    return this.http.delete(`${this.localApiUrl}/films/${id}/bookmarks`);
  }

  setBookmark(id: number, filmList: Array<Film>) {
    const foundFilm = filmList.find((film: Film) => {
      return film.id === id;
    });
    if (foundFilm.isBookmark) {
      this.addToBookmarks(id)
        .subscribe(() => this.buildBookmarks(filmList));
    } else {
      this.removeFromBookmarks(id)
        .subscribe(() => this.buildBookmarks(filmList));
    }
  }

  buildBookmarks(filmList: Array<Film>) {
    this.getBookmarks(filmList.map(film => film.id))
      .subscribe((bookmarks: Array<Bookmark>) => {
        const bookmarkList = bookmarks.map(bookmark => bookmark._id);
        filmList.map(film => {
          film.isBookmark = bookmarkList.indexOf(film.id) > -1;
        });
      },
        err => {
          console.log('favorite request error');
        }
      );
  }
}
