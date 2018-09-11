import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmService } from './../../shared/services/film.service';
import { Film } from './../../shared/models/film';
import { SearchService } from '../../shared/services/search.service';
import { UtilsService } from '../../shared/services/utils.service';
import { ListConfig } from '../../shared/models/listConfig'
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit, OnDestroy {

  showPageHeader: boolean = true;
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

  constructor(
    private filmService: FilmService,
    private searchService: SearchService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) { }

  getUrlParams(): any {
    return this.route.snapshot.url.map(url => url.path);
  }

  toggleFilmList() {
    let [state, id, tail = 'empty'] = this.getUrlParams();
    this.utilsService.includePram(tail)
      ? this.viewSimilarFilms(id) : this.viewFilms();
  }

  //Получить списка похожих фильмов
  viewSimilarFilms(id: number): void {
    this.filmService.loadSimilarFilms(id, this.page)
      .subscribe((films: Film[]) => {
        this.isLoading = false;
        this.filmList = [...this.filmList, ...films];
        this.showPageHeader = false;
        this.filmService.setViewType('backdrop');
      })
  }

  //Получить список фильмов
  viewFilms(): void {
    this.filmService.loadFilms(this.page, 'popular')
      .subscribe((films: Film[]) => {
        this.isLoading = false;
        this.filmList = [...this.filmList, ...films];
        this.filmService.setViewType('poster');
      });
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
    //this.viewFilms();
    this.toggleFilmList();
  }

  ngOnInit() {
    this.filmService.getLocalStorage();
    this.toggleFilmList();
    this.searchService.setState(this.state);
    this.getQuery();
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe() };
  }
}
