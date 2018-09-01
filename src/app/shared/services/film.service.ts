import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, mergeMap, pluck } from 'rxjs/operators';
import { API_CONFIG } from '../configs/api.config';
import { Config } from '../models/config';
import { UtilsService } from './utils.service';
import { Film } from '../models/film'
import { Observable } from 'rxjs';
import { LocalStorageCong } from '../models/localStorageConf'

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    @Inject(API_CONFIG) public apiConfig: Config
  ) { }
  films;
  page = 1;
  config: LocalStorageCong = {
    userId: '',
    sessionId: ''
  }

  getPopularFilms(page: number = this.page): Observable<Film[]> {
    return this.http.get(`${this.apiConfig.movieUrl}/popular?${this.apiConfig.params}page=${page}`)
      .pipe(
        pluck('results'),
        mergeMap(films => {
          return this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`)
            .pipe(
              pluck('results'),
              mergeMap(favorites => {
                return this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
                  .pipe(
                    pluck('results'),
                    map(watchList => {
                      this.page += 1;
                      let favoriteIds = this.getIds(favorites);
                      let watchListIds = this.getIds(watchList);
                      return this.setFilms(films, favoriteIds, watchListIds);
                    }))
              }))
        }))
  }

  /* getQueryFilm(query): Observable<Film[]> {
    return this.http.get(`${this.apiConfig.searchUrl}/movie?${this.apiConfig.params}&query=${query}&page=1`)
      .pipe(map(data => {
        let films = this.utilsService.findExactOccurrence(data['results'], query, 'title');
        return this.setFilms(films);
      }))
  } */

  getQueryFilm(query): Observable<Film[]> {
    return this.http.get(`${this.apiConfig.searchUrl}/movie?${this.apiConfig.params}&query=${query}&page=1`)
      .pipe(
        pluck('results'),
        mergeMap(films => {
          return this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`)
            .pipe(
              pluck('results'),
              mergeMap(favorites => {
                return this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
                  .pipe(
                    pluck('results'),
                    map(watchList => {
                      this.page += 1;
                      let filmsList = this.utilsService.findExactOccurrence(films, query, 'title');
                      let favoriteIds = this.getIds(favorites);
                      let watchListIds = this.getIds(watchList);
                      console.log(favoriteIds);
                      return this.setFilms(filmsList, favoriteIds, watchListIds);
                    }))
              }))
        }))
  }

  getFilmById(id): Observable<Film> {
    return this.http.get(`${this.apiConfig.movieUrl}/${id}?${this.apiConfig.params}`)
      .pipe(map(film => {
        return this.setFilm(film);
      })
      )
  }

  getDashboardFilms(): Observable<Film[]> {
    return this.http.get(`${this.apiConfig.movieUrl}/popular?${this.apiConfig.params}page=1`)
      .pipe(map(data => {
        let films = data['results'];
        let res = films.map((film, index) => {
          return {
            title: film.title,
            posterPath: film.poster_path,
            backdropPath: film.backdrop_path
          }
        })
        return res.splice(0, 3);
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
      isWatchList: false
    }
  }

  setFilms(films, favoritesId: number[], watchListId: number[]): Film[] {
    return films.map((film) => {
      return {
        title: film.title,
        releaseDate: film.release_date,
        overview: film.overview,
        voteAverage: film.vote_average,
        posterPath: film.poster_path,
        backdropPath: film.backdrop_path,
        id: film.id,
        isFavorite: this.isSelected(favoritesId, film),
        isWatchList: this.isSelected(watchListId, film)
      }
    })
  }

  setFavoritesOrWatchlist(params, request): Observable<any> {
    return this.http.post(`${this.apiConfig.authUrl}/account/${this.config.userId}/${request}?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`, params)
  }

  loadFavorites(): Observable<any> {
    return this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`)
      .pipe(map(data => {
        return this.getIds(data['results']);
      }))
  }

  loadWatchList(): Observable<any> {
    return this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
      .pipe(map(data => {
        return this.getIds(data['results']);
      }))
  }

  getIds(films): number[] {
    return films.map(film => film['id']);
  }

  setState(films: Film[], ids: number[], config): Film[] {
    return films.map((film: Film) => {
      ids.forEach((id: number) => {
        if (id == film['id']) film[config] = true; //config.property - isFavorite or isWatchList
      })
      return film;
    })
  }

  isSelected(ids: number[], filmId: number): boolean {
    return ids.includes(filmId);
  }

  setOneFilmState(film: Film, ids: number[], config): Film {
    ids.forEach(id => {
      if (id == film.id) {
        film[config.property] = true;
      }
    })
    return film;
  }

  getLocalStorage(): void {
    if (this.config.userId && this.config.sessionId) return;
    this.config.userId = localStorage.getItem('user_id');
    this.config.sessionId = localStorage.getItem('session_id');
  }

}
