import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteApiService {
  localApiUrl: string = 'http://localhost:3000';
  favoriteApiUrl: string = `${this.localApiUrl}/films/favorites`;

  constructor(private http: HttpClient) {}

  getFavorite(filmIds: Array<number>) {
    return this.http.get(`${this.favoriteApiUrl}?filmIds=${filmIds.join(',')}`);
  }

  addToFavorite(id: number) {
    return this.http.post(this.favoriteApiUrl, { filmId: id });
  }

  removeFromFavorites(id: number) {
    return this.http.delete(`${this.localApiUrl}/films/${id}/favorites`);
  }
}
