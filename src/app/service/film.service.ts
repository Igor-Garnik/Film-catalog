import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Film } from './../models/film';
import { map } from 'rxjs/operators';
import { API_CONFIG } from '../shared/api.config';
import { Config } from '../shared/config';


@Injectable({
  providedIn: 'root'
})
export class FilmService {
  page = 1;

  constructor(private http: HttpClient, @Inject(API_CONFIG) public apiConfig: Config) {
  }

  getPopularFilms(page: number = this.page) {
    return this.http.get(`${this.apiConfig.movieUrl}/popular?${this.apiConfig.params}page=${page}`)
      .pipe(map(data => {
        let films = data['results'];
        this.page += 1;
        return films.map(film => {
          return {
            title: film.title,
            releaseDate: film.release_date,
            overview: film.overview,
            voteAverage: film.vote_average,
            posterPath: film.poster_path,
            id: film.id,
            isFavorite: false,
            isBookmark: false
          }
        })
      }))
  }

}
