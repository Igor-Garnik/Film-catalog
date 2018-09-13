import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

  constructor(
    private filmService: FilmService,
    private searchService: SearchService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) { }

  /* toggleFilmList() {
    this.filmId !== undefined
      ? this.viewSimilarFilms() : this.viewFilms();
  } */

  toggleFilmList(): void {
    switch (this.kindOfFilmsList) {
      case 'similar': this.viewSimilarFilms();
        break;
      case 'credits': this.viewMovieCreditsFilms();
        break;
      default:
        this.viewPopularFilms();
    }
  }

  //Получить списк похожих фильмов
  viewSimilarFilms(): void {
    this.filmService.loadSimilarFilms(this.filmId, this.page)
      .subscribe((films: Film[]) => {
        this.isLoading = false;
        this.filmList = [...this.filmList, ...films];
      })
  }

  //Получить список фильмов с учатием определенного актера
  viewMovieCreditsFilms(): void {
    this.filmService.loadMovieCredits(this.filmId)
      .subscribe((films: Film[]) => {
        this.isLoading = false;
        this.filmList = [...this.filmList, ...films];
        console.log(films);
      })
  }

  //Получить список фильмов
  viewPopularFilms(): void {
    this.filmService.loadFilms(this.page, 'popular')
      .subscribe((films: Film[]) => {
        this.isLoading = false;
        this.filmList = [...this.filmList, ...films];
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
    this.toggleFilmList();
  }

  ngOnInit() {
    this.filmService.getLocalStorage();
    this.toggleFilmList();
    this.searchService.setState(this.state);
    this.getQuery();
    console.log(this.filmId)
    console.log(this.kindOfFilmsList)
    console.log(this.cardView)
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe() };
  }
}
