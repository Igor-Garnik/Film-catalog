import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { API_CONFIG } from '../shared/api.config';
import { Config } from '../shared/config';
import { UtilsService } from './utils.service';
import { Film } from '../models/film'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    @Inject(API_CONFIG) public apiConfig: Config
  ) { }

  page = 1;
  filmsList: Film[] = [];

  getPopularFilms(page: number = this.page): Observable<Film[]> {
    return this.http.get(`${this.apiConfig.movieUrl}/popular?${this.apiConfig.params}page=${page}`)
      .pipe(map(data => {
        let films = data['results'];
        this.page += 1;
        return this.setFilms(films);
      }), tap(data => {
        this.filmsList = this.filmsList.concat(data);
      }))
  }

  getQueryFilm(query): Observable<Film[]> {
    return this.http.get(`${this.apiConfig.searchUrl}/movie?${this.apiConfig.params}&query=${query}&page=1`)
      .pipe(map(data => {
        let films = this.utilsService.findExactOccurrence(data['results'], query, 'title');
        return this.setFilms(films);
      }))
  }

  /* getFilmById(id): Film {
    let film: Film;
    this.filmsList.forEach(data => {
      if (data['id'] == id) { film = data };
    })
    return film;
  } */

  getFilmById(id): Observable<Film> {
    return this.http.get(`${this.apiConfig.movieUrl}/${id}?${this.apiConfig.params}`)
      .pipe(map(film => {
        return this.setFilm(film);

      }))
  }

  getDashboardFilms(): Observable<Film[]> {
    return this.http.get(`${this.apiConfig.movieUrl}/popular?${this.apiConfig.params}page=1`)
      .pipe(map(data => {
        let films = data['results'];
        let res = films.map((film, index) => {
          return {
            title: film.title,
            posterPath: film.poster_path,
          }
        })
        return res.splice(0, 6);
      }))
  }

  setFilm(film): Film {
    return {
      title: film.title,
      releaseDate: film.release_date,
      overview: film.overview,
      voteAverage: film.vote_average,
      posterPath: film.poster_path,
      backdropPath: film.backdrop_path,
      id: film.id,
      isFavorite: false,
      isBookmark: false
    }
  }

  setFilms(films): Film[] {
    return films.map((film) => {
      return {
        title: film.title,
        releaseDate: film.release_date,
        overview: film.overview,
        voteAverage: film.vote_average,
        posterPath: film.poster_path,
        backdropPath: film.backdrop_path,
        id: film.id,
        isFavorite: false,
        isBookmark: false
      }
    })
  }

}
