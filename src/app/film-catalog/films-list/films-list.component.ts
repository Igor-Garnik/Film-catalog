import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmService } from './../../shared/services/film.service';
import { Film } from './../../shared/models/film';
import { SearchService } from '../../shared/services/search.service';
import { UtilsService } from '../../shared/services/utils.service';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit, OnDestroy {
  query: string;
  page: number = 1;
  filmList: Film[] = [];
  isLoading: boolean = true;
  queryResponse: Film[] = [];
  subscription: Subscription;
  isErrorMessage: boolean = false;
  state: string = 'films';

  constructor(
    private filmService: FilmService,
    private searchService: SearchService,
    private utilsService: UtilsService
  ) { }

  //Получить список фильмов
  viewFilms(): void {
    this.filmService.getPopularFilms()
      .subscribe((films: Film[]) => {
        this.isLoading = false;
        this.filmList = [...this.filmList, ...films]
      });
  }

  //Получить список фильмов согласно поиска
  viewQuery(): void {
    this.subscription = this.searchService.getQuery()
      .pipe(
        mergeMap((query: string) => {
          return this.filmService.getQueryFilm(query)
            .pipe(
              map((films: Film[]) => {
                this.query = query;
                this.isLoading = false;
                this.queryResponse = [...films];
                this.isErrorMessage = this.utilsService.checkErrroMessage(this.queryResponse);
              }))
        }))
      .subscribe();
  }

  //Добавить в избранное
  addToFavorite(film: Film): void {
    this.filmService.setFavoritesOrWatchlist(film.id, film.isFavorite).subscribe();
  }

  //Добавить в закладки
  addToWatchlist(film: Film): void {
    this.filmService.setFavoritesOrWatchlist(film.id, film.isWatchList).subscribe();
  }

  //Добавление страницы
  addPage(): void {
    this.viewFilms();
  }

  ngOnInit() {
    this.filmService.getLocalStorage();
    this.viewFilms();
    this.searchService.setState(this.state);
    this.viewQuery();
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe() };
  }
}
