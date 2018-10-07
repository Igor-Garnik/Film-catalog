import { Injectable } from '@angular/core';
import { FilmApiService } from './film-API.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { Film } from './film';
import { ListConfig } from '../../../shared/models/listConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(
    private filmApiService: FilmApiService,
    private utilsService: UtilsService
  ) { }

  filmsList: Array<Film> = [];
  request = {
    favorite: 'favorite',
    watchlist: 'watchlist'
  }

  getFilmsList(page: number, filmId: number, kindOfFilmsList: string): Observable<any> {
    return this.toggleFilmList(page, filmId, kindOfFilmsList);
  }

  toggleFilmList(page: number, filmId: number, kindOfFilmsList: string): Observable<any> {
    if (kindOfFilmsList == 'similar') return this.viewSimilarFilms(page, filmId);
    if (kindOfFilmsList == 'credits') return this.viewMovieCreditsFilms(filmId);
    if (kindOfFilmsList == 'favorites') return this.viewFavoritesFilms();
    if (kindOfFilmsList == 'watchlist') return this.getWatchLIstFilms();
    if (kindOfFilmsList == 'upcoming') return this.viewDifferentFilmsList(page, kindOfFilmsList);
    if (kindOfFilmsList == 'top_rated') return this.viewDifferentFilmsList(page, kindOfFilmsList);
    if (kindOfFilmsList == 'now_playing') return this.viewDifferentFilmsList(page, kindOfFilmsList);
    if (kindOfFilmsList == 'popular') return this.viewDifferentFilmsList(page);
  }

  //Получить списк похожих фильмов
  viewSimilarFilms(page: number, filmId: number): Observable<any> {
    this.utilsService.setIsUploaded(false);
    return this.filmApiService.loadSimilarFilms(filmId, page)
  }

  //Получить список фильмов с учатием определенного актера
  viewMovieCreditsFilms(filmId: number): Observable<any> {
    this.utilsService.setIsUploaded(false);
    return this.filmApiService.loadMovieCredits(filmId)
  }

  //Получить списк любимых фильмов
  viewFavoritesFilms(): Observable<any> {
    this.utilsService.setIsUploaded(false);
    return this.filmApiService.loadFavoritesFilms()
  }

  //Получить списк фильмов к просмотру
  getWatchLIstFilms(): Observable<any> {
    this.utilsService.setIsUploaded(false);
    return this.filmApiService.loadWatchlistFilms()
  }

  //Получить список фильмов
  viewDifferentFilmsList(page: number, param?): any {
    return this.filmApiService.loadFilms(page, param);
  }

  defineTitle(kindOfFilmsList: string): string {
    if (kindOfFilmsList == 'popular') return 'Популяные фильмы';
    if (kindOfFilmsList == 'upcoming') return 'Ожидаемые фильмы';
    if (kindOfFilmsList == 'top_rated') return 'Фильмы с высшим рейтингом';
    if (kindOfFilmsList == 'now_playing') return 'Сейчас в кинотеатрах';
  }

  //Добавить в избранное
  addToFavorite(film: Film): void {
    let config = this.setConfig(film.id, film.isFavorite, this.request.favorite);
    this.filmApiService.setFavoritesOrWatchlist(config, this.request.favorite)
      .subscribe();
  }

  //Добавить в закладки
  addToWatchlist(film: Film): void {
    let config = this.setConfig(film.id, film.isFavorite, this.request.watchlist);
    this.filmApiService.setFavoritesOrWatchlist(config, this.request.watchlist)
      .subscribe();
  }


  //Создание объекта для передачи в movie DB
  setConfig(id: number, isChecked: boolean, type: string) {
    let config = new ListConfig();
    config['media_type'] = "movie";
    config['media_id'] = id;
    config[type] = isChecked;
    return config;
  }
}


