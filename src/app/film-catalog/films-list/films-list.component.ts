import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmService } from './../../shared/services/film.service';
import { Film } from './../../shared/models/film';
import { SearchService } from '../../shared/services/search.service';
import { UtilsService } from '../../shared/services/utils.service';
import { ListConfig } from '../../shared/models/listConfig'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material';
import { ListenerDownloadsService } from '../../shared/services/listenerDownloads.service';


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
  isUploaded: boolean = true;
  queryResponse: Film[] = [];
  subscription: Subscription;
  filmsResults: Subscription;
  isErrorMessage: boolean = false;
  state: string = 'films';
  request = {
    favorite: 'favorite',
    watchlist: 'watchlist'
  }
  filmListState: string = "favorites"
  urlParam: string;
  pagesQuantity = 0;
  pageSize = 20;
  pageSizeOptions: number[] = [20, 40];
  totalPages: number;



  constructor(
    private filmService: FilmService,
    private searchService: SearchService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private listenerDownloadsService: ListenerDownloadsService
  ) { }

  getPage(event) {
    console.log(event);
  }

  getParam() {
    this.listenerDownloadsService.setIsUploaded(this.isUploaded = true);
    this.route.paramMap.pipe(
      tap((params: ParamMap) =>
        this.urlParam = params.get('list-type'))
    ).subscribe(() => {
      this.checkParam(this.urlParam);
      this.toggleFilmList();
    })
  }

  updateFilmList(): void {
    if (this.filmListState !== this.kindOfFilmsList) {
      this.filmListState = this.kindOfFilmsList;
      this.filmList = [];
      this.listenerDownloadsService.setIsUploaded(this.isUploaded = true);
    }
  }

  checkParam(param: string): void {
    if (param !== null) this.kindOfFilmsList = param;
  }

  toggleFilmList(): void {
    this.updateFilmList();
    switch (this.kindOfFilmsList) {
      case 'similar': this.viewSimilarFilms();
        break;
      case 'credits': this.viewMovieCreditsFilms();
        break;
      case 'favorites': this.viewFavoritesFilms();
        break;
      case 'watchlist': this.getWatchLIstFilms();
        break;
      case 'upcoming': this.viewDifferentFilmsList(this.kindOfFilmsList); //передача параметра запроса
        break;
      case 'top_rated': this.viewDifferentFilmsList(this.kindOfFilmsList); //передача параметра запроса
        break;
      case 'now_playing': this.viewDifferentFilmsList(this.kindOfFilmsList); //передача параметра запроса
        break;
      default:
        this.viewDifferentFilmsList(); //параметр запросы по умолчанию
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
  viewDifferentFilmsList(param?): void {
    this.filmService.loadFilms(this.page, param)
      .subscribe((films: Film[]) => this.copyFilmList(films));
  }

  copyFilmList(films: Film[]): void {
    this.listenerDownloadsService.setIsUploaded(this.isUploaded = false);
    this.filmList = [...this.filmList, ...films];
  }

  //Получить список фильмов согласно поиска
  viewQuery(query): void {
    this.filmService.getQueryFilm(query)
      .subscribe((films: Film[]) => {
        this.listenerDownloadsService.setIsUploaded(this.isUploaded = false);
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

  getFilmsTotalPages(): void {
    this.filmsResults = this.filmService.getTotalFilmsResults()
      .subscribe((result: number) => this.totalPages = result);

  }

  ngOnInit() {
    this.filmService.getLocalStorage();
    this.searchService.setState(this.state);
    this.getQuery();
    this.getParam();
    this.getFilmsTotalPages();
    this.listenerDownloadsService.setIsUploaded(this.isUploaded);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    this.filmsResults.unsubscribe();
  }
}
