<<<<<<< HEAD
import { Injectable, Inject } from '@angular/core';
=======
import { Injectable } from '@angular/core';
>>>>>>> d6714bd911b996e21fc7df85a7a442e4ae31a362
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

<<<<<<< HEAD
  constructor(private http: HttpClient, @Inject(API_CONFIG) public apiConfig: Config) {
  }

  getPopularFilms(page: number = this.page) {
    return this.http.get(`${this.apiConfig.movieUrl}/popular?${this.apiConfig.params}page=${page}`)
=======
  constructor(private http: HttpClient, public dataService: DataService) {
  }

  getPopularFilms(page: number = this.page) {
    return this.http.get(`${this.dataService.movieUrl}/popular?${this.dataService.params}page=${page}`)
>>>>>>> d6714bd911b996e21fc7df85a7a442e4ae31a362
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
