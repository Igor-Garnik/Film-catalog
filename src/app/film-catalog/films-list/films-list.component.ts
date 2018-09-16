import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmService } from './../../shared/services/film.service';
import { Film } from './../../shared/models/film';
import { SearchService } from '../../shared/services/search.service';
import { UtilsService } from '../../shared/services/utils.service';
import { ListConfig } from '../../shared/models/listConfig'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit, OnDestroy {

  @Input() filmId;
  @Input() cardView;
  @Input() kindOfFilmsList;

  query: string;
  page: number = 1;
  filmList: Film[] = [];
  isLoading: boolean = true;
  queryResponse: Film[] = [];
  subscription: Subscription;
  isErrorMessage: boolean = false;
  state: string = 'films';
  request = {
    favorite: 'favorite',
    watchlist: 'watchlist'
  }
  test;

  constructor(
    private filmService: FilmService,
    private searchService: SearchService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) { }

  getParam() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.test = params.get('list-type'))
    )
  }

  //Отображение подписи Популярных фильмов
  viewHeaderTitle(): boolean {
    return this.filmId || this.cardView || this.kindOfFilmsList ? true : false;
  }

  toggleFilmList(): void {
    switch (this.kindOfFilmsList) {
      case 'similar': this.viewSimilarFilms();
        break;
      case 'credits': this.viewMovieCreditsFilms();
        break;
      case 'favorites': this.viewFavoritesFilms();
        break;
      case 'watchList': this.viewMovieCreditsFilms();
        break;
      default:
        this.viewPopularFilms();
    }
  }

  viewFavoritesFilms(): void {
    this.filmService.loadFavoritesFilms()
      .subscribe((films: Film[]) => this.copyFilmList(films));
  }

  getWatchLIstFilms(): void {
    this.filmService.loadWatchlistFilms()
      .subscribe((films: Film[]) => this.copyFilmList(films));
  }

  //Получить списк похожих фильмов
  viewSimilarFilms(): void {
    this.filmService.loadSimilarFilms(this.filmId, this.page)
      .subscribe((films: Film[]) => this.copyFilmList(films));
  }

  //Получить список фильмов с учатием определенного актера
  viewMovieCreditsFilms(): void {
    this.filmService.loadMovieCredits(this.filmId)
      .subscribe((films: Film[]) => this.copyFilmList(films));
  }

  //Получить список фильмов
  viewPopularFilms(): void {
    this.filmService.loadFilms(this.page, 'popular')
      .subscribe((films: Film[]) => this.copyFilmList(films));
  }

  copyFilmList(films: Film[]): void {
    this.isLoading = false;
    this.filmList = [...this.filmList, ...films];
  }

  //Получить список фильмов согласно поиска
  viewQuery(query): void {
    this.filmService.getQueryFilm(query)
      .subscribe((films: Film[]) => {
        this.isLoading = false;
        this.queryResponse = [...films];
        this.isErrorMessage = this.utilsService.checkErrroMessage(this.queryResponse);
      })
  }

  //Получить значение поиска
  getQuery() {
    this.subscription = this.searchService.getQuery()
      .subscribe((query: string) => {
        this.query = query;
        if (query) this.viewQuery(query);
      })
  }

  //Добавить в избранное
  addToFavorite(film: Film): void {
    let config = this.setConfig(film.id, film.isFavorite, this.request.favorite);
    this.filmService.setFavoritesOrWatchlist(config, this.request.favorite)
      .subscribe();
  }

  //Добавить в закладки
  addToWatchlist(film: Film): void {
    let config = this.setConfig(film.id, film.isFavorite, this.request.watchlist);
    this.filmService.setFavoritesOrWatchlist(config, this.request.watchlist)
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

  //Добавление страницы
  addPage(): void {
    this.page += 1;
    this.toggleFilmList();
  }

  ngOnInit() {
    this.filmService.getLocalStorage();
    this.toggleFilmList();
    this.searchService.setState(this.state);
    this.getQuery();
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.test = params.get('list-type'))
    )
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe() };
  }
}
