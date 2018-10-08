import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pluck } from 'rxjs/operators';
import { API_CONFIG } from '../../../shared/configs/api.config';
import { Config } from '../../../shared/models/config';
import { Film } from './film';
import { Subject, Observable, forkJoin } from 'rxjs';
import { LocalStorageCong } from '../../../shared/models/localStorageConf'
import { UtilsService } from '../../../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class FilmApiService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    @Inject(API_CONFIG) public apiConfig: Config
  ) { }

  filmsResults$ = new Subject<any>();
  films;
  page = 1;
  config: LocalStorageCong = {
    userId: '',
    sessionId: ''
  }
  results: number = 0;

  //Получение списка списка фильмов "favorites", перезаписание значения свойств избранные и список согласно даных пользователя
  loadFilms(page: number, param: string = 'popular'): Observable<any> {
    return forkJoin(
      this.http.get(`${this.apiConfig.movieUrl}/${param}?${this.apiConfig.params}page=${page}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}&language=ru-Ru&sort_by=created_at.asc&page=1`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => this.setListWithTotalResults(res))
    )
  }

  loadMainList(page: number, param: string): Observable<any> {
    return this.http.get(`${this.apiConfig.movieUrl}/${param}?${this.apiConfig.params}page=${page}`)
      .pipe(
        pluck('results'),
        map((res: Array<any>) => {
          return res.map(film => {
            return {
              title: film.title,
              posterPath: film.poster_path,
              backdropPath: film.backdrop_path,
              id: film.id,
            }
          })
        })
      )
  }

  getQueryFilm(query: string): Observable<Film[]> {
    return forkJoin(
      this.http.get(`${this.apiConfig.searchUrl}/movie?${this.apiConfig.params}&query=${query}&page=1`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}&language=ru-Ru&sort_by=created_at.asc&page=1`),
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
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}&language=ru-Ru&sort_by=created_at.asc&page=1`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => {
        let [film, favorites, watchList] = [res[0], res[1].results, res[2].results];
        let favoriteIds = this.getIds(favorites);
        let watchListIds = this.getIds(watchList);
        return this.setFilmProperty(film, favoriteIds, watchListIds);
      })
    )
  }

  loadSimilarFilms(filmId: number, page: number): Observable<Film[]> {
    return forkJoin(
      this.http.get(`${this.apiConfig.movieUrl}/${filmId}/similar?${this.apiConfig.params}page=${page}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}&language=ru-Ru&sort_by=created_at.asc&page=1`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => this.setListWithTotalResults(res))
    )
  }

  loadMovieCredits(filmId: number): Observable<any> {
    return forkJoin(
      this.http.get(`${this.apiConfig.personUrl}/${filmId}/movie_credits?${this.apiConfig.params}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}&language=ru-Ru&sort_by=created_at.asc&page=1`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => {
        let [film, favorites, watchList] = [res[0].cast, res[1].results, res[2].results];
        let favoriteIds = this.getIds(favorites);
        let watchListIds = this.getIds(watchList);
        return this.setFilmsProperty(film, favoriteIds, watchListIds);
      })
    )
  }

  loadFavoritesFilms(): Observable<any> {
    return forkJoin(
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}&language=ru-Ru&sort_by=created_at.asc&page=1`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => {
        let [favorites, watchList] = [res[0].results, res[1].results];
        let favoriteIds = this.getIds(favorites);
        let watchListIds = this.getIds(watchList);
        return this.setFilmsProperty(favorites, favoriteIds, watchListIds);
      })
    )
  }

  loadWatchlistFilms(): Observable<any> {
    return forkJoin(
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}&language=ru-Ru&sort_by=created_at.asc&page=1`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => {
        let [favorites, watchList] = [res[0].results, res[1].results];
        let favoriteIds = this.getIds(favorites);
        let watchListIds = this.getIds(watchList);
        return this.setFilmsProperty(watchList, favoriteIds, watchListIds);
      })
    )
  }

  loadFilmsList(id: number, page: number): Observable<Film[]> {
    return forkJoin(
      this.http.get(`https://api.themoviedb.org/4/list/${id}?page=${page}${this.apiConfig.params}`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}&language=ru-Ru&sort_by=created_at.asc&page=1`),
      this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/watchlist/movies?${this.apiConfig.apiKey}&language=en-US&session_id=${this.config.sessionId}&sort_by=created_at.asc&page=1`)
    ).pipe(
      map((res: Array<any>) => this.setListWithTotalResults(res))
    )
  }

  setFilmsProperty(films, favoritesId: number[], watchListId: any): Film[] {
    return films.map((film) => {
      return this.setFilmProperty(film, favoritesId, watchListId)
    })
  }

  //Определение необходимых свойтв фильма
  setFilmProperty(film, favoritesId: number[], watchListId: any): Film {
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

  setListWithTotalResults(res): any {
    let [totalResults, films, favorites, watchList] = [res[0].total_results, res[0].results, res[1].results, res[2].results];
    let favoriteIds = this.getIds(favorites);
    let watchListIds = this.getIds(watchList);
    return [totalResults, this.setFilmsProperty(films, favoriteIds, watchListIds)];
  }


  //Установка свойств избранные и список
  setFavoritesOrWatchlist(params, request): Observable<any> {
    return this.http.post(`${this.apiConfig.authUrl}/account/${this.config.userId}/${request}?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}`, params)
  }

  //Загрузка фильмов в списке "избранные"
  loadFavorites(): Observable<any> {
    return this.http.get(`${this.apiConfig.authUrl}/account/${this.config.userId}/favorite/movies?${this.apiConfig.apiKey}&session_id=${this.config.sessionId}&language=en-US&sort_by=created_at.asc&page=1`)
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
