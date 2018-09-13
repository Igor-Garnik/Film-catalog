import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, pluck } from 'rxjs/operators';
import { API_CONFIG } from '../configs/api.config';
import { Config } from '../models/config';
import { UtilsService } from './utils.service';
import { Film } from '../models/film'
import { Subject, Observable, forkJoin } from 'rxjs';
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

  viewType$ = new Subject<any>();
  films;
  page = 1;
  config: LocalStorageCong = {
    userId: '',
    sessionId: ''
  }

  //Получение списка списка фильмов "favorites", перезаписание значения свойств избранные и список согласно даных пользователя
  loadFilms(page: number, param: string): Observable<Film[]> {
    return forkJoin(
      this.http.get(`${this.apiConfig.movieUrl}/${param}?${this.apiConfig.params}page=${page}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => {
        let [films, favorites, watchList] = [res[0].results, res[1].results, res[2].results];
        let favoriteIds = this.getIds(favorites);
        let watchListIds = this.getIds(watchList);
        return this.setFilmsProperty(films, favoriteIds, watchListIds);
      })
    )
  }

  getQueryFilm(query: string): Observable<Film[]> {
    return forkJoin(
      this.http.get(`${this.apiConfig.searchUrl}/movie?${this.apiConfig.params}&query=${query}&page=1`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => {
        let [films, favorites, watchList] = [res[0].results, res[1].results, res[2].results];
        let filmsList = this.utilsService.findExactOccurrence(films, query, 'title');
        let favoriteIds = this.getIds(favorites);
        let watchListIds = this.getIds(watchList);
        return this.setFilmsProperty(filmsList, favoriteIds, watchListIds);
      })
    )
  }

  //Получение списка списка фильмов по поиску пользователя, перезаписание значения свойств избранные и список согласно даных пользователя
  loadFilmById(filmId: number): Observable<Film> {
    return forkJoin(
      this.http.get(`${this.apiConfig.movieUrl}/${filmId}?${this.apiConfig.params}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => {
        let film = res[0];
        let [favorites, watchList] = [res[1].results, res[2].results];
        let favoriteIds = this.getIds(favorites);
        let watchListIds = this.getIds(watchList);
        return this.setFilmProperty(film, favoriteIds, watchListIds);
      })
    )
  }

  loadSimilarFilms(filmId: number, page: number): Observable<Film[]> {
    return forkJoin(
      this.http.get(`${this.apiConfig.movieUrl}/${filmId}/similar?${this.apiConfig.params}page=${page}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => {
        let [films, favorites, watchList] = [res[0].results, res[1].results, res[2].results];
        let favoriteIds = this.getIds(favorites);
        let watchListIds = this.getIds(watchList);
        return this.setFilmsProperty(films, favoriteIds, watchListIds);
      })
    )
  }

  loadMovieCredits(filmId: number): Observable<Film[]> {
    return forkJoin(
      this.http.get(`${this.apiConfig.personUrl}/${filmId}/movie_credits?${this.apiConfig.params}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => {
        let film = res[0].cast;
        let [favorites, watchList] = [res[1].results, res[2].results];
        let favoriteIds = this.getIds(favorites);
        let watchListIds = this.getIds(watchList);
        return this.setFilmsProperty(film, favoriteIds, watchListIds);
      })
    )
  }

  setFilmsProperty(films, favoritesId: number[], watchListId: number[]): Film[] {
    return films.map((film) => {
      return this.setFilmProperty(film, favoritesId, watchListId)
    })
  }

  //Определение необходимых свойтв фильма
  setFilmProperty(film, favoritesId: number[], watchListId: number[]): Film {
    return {
      title: film.title,
      releaseDate: film.release_date,
      overview: film.overview,
      voteAverage: film.vote_average,
      posterPath: film.poster_path,
      backdropPath: film.backdrop_path,
      id: film.id,
      isFavorite: this.isSelected(favoritesId, film.id),
      isWatchList: this.isSelected(watchListId, film.id)
    }
  }

  //Установка свойств избранные и список
  setFavoritesOrWatchlist(params, request): Observable<any> {
    console.log(params);
    return this.http.post(`${this.apiConfig.authUrl}/account/${this.config.userId}/${request}?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`, params)
  }

  //Загрузка фильмов в списке "избранные"
  loadFavorites(): Observable<any> {
    return this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`)
      .pipe(map(data => {
        return this.getIds(data['results']);
      }))
  }

  //Загрузка фильмов в списке "список"
  loadWatchList(): Observable<any> {
    return this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
      .pipe(map(data => {
        return this.getIds(data['results']);
      }))
  }

  //Получение массива id фильмов
  getIds(films): number[] {
    return films.map(film => film['id']);
  }

  //Установка значение "в избранном" или "в списке" согласно загруженых данных пользователя
  isSelected(ids: number[], filmId: number): boolean {
    return ids.includes(filmId);
  }

  //Получение данных из local storage
  getLocalStorage(): void {
    if (this.config.userId && this.config.sessionId) return;
    this.config.userId = localStorage.getItem('user_id');
    this.config.sessionId = localStorage.getItem('session_id');
  }

}
