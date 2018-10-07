import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmApiService } from '../shared/film-API.service';
import { Film } from '../shared/film';
import { UtilsService } from '../../../shared/services/utils.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FilmService } from '../shared/film.service';

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
  filmsList;
  isUploaded: boolean = false;
  queryResponse: Film[] = [];
  isErrorMessage: boolean;
  state: string = 'films';
  filmListState: string = "favorites"
  urlParam: string;
  pagesQuantity = 0;
  totalFilmsResults: number = null;
  subscription: Subscription;
  list: Subscription;


  constructor(
    private filmApiService: FilmApiService,
    private utilsService: UtilsService,
    private filmService: FilmService,
    private route: ActivatedRoute,
  ) { }

  getFilmsList() {
    this.route.paramMap.pipe(
      tap((params: ParamMap) =>
        this.urlParam = params.get('list-type'))
    ).subscribe(() => {
      this.utilsService.setIsUploaded(this.isUploaded = true);
      this.kindOfFilmsList = this.utilsService.checkParam(this.urlParam, this.kindOfFilmsList);
      this.updateFilmList();
      /* this.filmsList = this.filmService.toggleFilmList(this.page, this.filmId, this.kindOfFilmsList) | async */
      this.uploadFilmsList();
    })
  }

  uploadFilmsList(): void {
    this.list = this.filmService.toggleFilmList(this.page, this.filmId, this.kindOfFilmsList)
      .subscribe((data: Array<any>) => {
        this.utilsService.setIsUploaded(this.isUploaded = false);
        this.totalFilmsResults = data[0];
        this.filmsList = data[1];
        console.log(data);
      });
  }

  //Обнудение списка фильмов при изменении отображаемого списка
  updateFilmList(): void {
    if (this.filmListState !== this.kindOfFilmsList) {
      this.filmListState = this.kindOfFilmsList;
      this.filmsList = [];
    }
  }

  //Добавить в избранное
  addToFavorite(film: Film): void {
    this.filmService.addToFavorite(film);
  }


  //Добавить в закладки
  addToWatchlist(film: Film): void {
    this.filmService.addToWatchlist(film);
  }

  //Пейджинг
  togglePage(newPage): void {
    this.page = newPage;
    this.uploadFilmsList();
  }


  defineListTitle(): string {
    return this.filmService.defineTitle(this.kindOfFilmsList);
  }

  ngOnInit() {
    this.utilsService.setIsUploaded(true)
    this.filmApiService.getLocalStorage();
    this.utilsService.setState(this.state);
    this.getFilmsList();
    this.utilsService.scrorollToTop();
    console.log('init')
  }

  ngOnDestroy() {
    this.list.unsubscribe();
  }

}
