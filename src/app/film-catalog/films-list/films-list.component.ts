import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmService } from './../../service/film.service';
import { FavoriteApiService } from '../../service/favorite.api.service';
import { BookmarkApiService } from '../../service/bookmark.api.service';
import { Film } from './../../models/film';
import { SearchService } from '../../service/search.service';
import { UtilsService } from '../../service/utils.service';

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
    private utilsService: UtilsService,
    private favoriteApiService: FavoriteApiService,
    private bookmarkApiService: BookmarkApiService
  ) { }

  //Загрузить список фильмов
  viewFilms(): void {
    this.filmService.getPopularFilms().subscribe(films => {
      this.isLoading = false;
      this.filmList = [...this.filmList, ...films];
      this.favoriteApiService.buildFavorites(this.filmList);
      this.bookmarkApiService.buildBookmarks(this.filmList);
    });
  }

  //Добавить в избранное
  addToFavorite(id: number) {
    this.favoriteApiService.setStar(id, this.filmList);
  }

  //Добавить в закладки
  addToBookmark(id: number) {
    this.bookmarkApiService.setBookmark(id, this.filmList);
  }

  //Добавление страницы
  addPage(): void {
    this.viewFilms();
  }

  //
  updateMarks() {
    if (this.isErrorMessage == false) {
      this.favoriteApiService.buildFavorites(this.queryResponse);
      this.bookmarkApiService.buildBookmarks(this.queryResponse);
    }
  }

  //Отображает закладки и избранное если поиск дал позитивный результат
  setMarks() {
    if (!this.isErrorMessage) {
      this.favoriteApiService.buildFavorites(this.queryResponse);
      this.bookmarkApiService.buildBookmarks(this.queryResponse);
    }
  }

  viewQuery() {
    this.searchService.getQuery().subscribe((query: string) => {
      this.query = query;
      this.subscription = this.filmService.getQueryFilm(query).subscribe((data) => {
        this.queryResponse = data;
        this.isErrorMessage = this.utilsService.checkErrroMessage(this.queryResponse)
        this.updateMarks();
      });
    })
  }

  ngOnInit() {
    this.viewFilms();
    this.searchService.setState(this.state);
    this.viewQuery();
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe() };
  }
}
