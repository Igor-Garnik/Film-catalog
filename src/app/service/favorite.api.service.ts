import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Film } from './../models/film';
import { Favorite } from './../models/favorite'

@Injectable({
  providedIn: 'root'
})
export class FavoriteApiService {
  localApiUrl: string = 'http://localhost:3000';
  favoriteApiUrl: string = `${this.localApiUrl}/films/favorites`;

  constructor(private http: HttpClient) { }

  getFavorite(filmIds: Array<number>) {
    return this.http.get(`${this.favoriteApiUrl}?filmIds=${filmIds.join(',')}`);
  }

  addToFavorite(id: number) {
    return this.http.post(this.favoriteApiUrl, { filmId: id });
  }

  removeFromFavorites(id: number) {
    return this.http.delete(`${this.localApiUrl}/films/${id}/favorites`);
  }

  setStar(id: number, filmList: Array<Film>): void {
    const foundFilm = filmList.find((film: Film) => {
      return film.id === id;
    });
    if (foundFilm.isFavorite) {
      this.addToFavorite(id)
        .subscribe(() => this.buildFavorites(filmList));
    } else {
      this.removeFromFavorites(id)
        .subscribe(() => this.buildFavorites(filmList));
    }
  }

  buildFavorites(filmList: Array<Film>): void {
    this.getFavorite(filmList.map(film => film.id))
      .subscribe((favorites: Array<Favorite>) => {
        let favoriteList = favorites.map(favorite => favorite._id);
        filmList.map(film => {
          film.isFavorite = favoriteList.indexOf(film.id) > -1;
        });
      },
        err => {
          console.log('favorite request error');
        }
      );
  }
}
