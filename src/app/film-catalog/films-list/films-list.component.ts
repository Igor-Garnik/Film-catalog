import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable, Subject } from 'rxjs';

import { SearchService } from './../../service/search.searvice';
import { FilmService } from './../../service/film.service';
import { FavoriteApiService } from '../../service/favorite.api.service';
import { BookmarkApiService } from '../../service/bookmark.api.service';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Film } from './../../models/film';

import { Bookmark } from './../../models/bookmark';
import { Favorite } from './../../models/favorite';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  query: string = '';
  page: number = 1;
  filmList: Film[] = [];
  isUploaded: boolean = true;
  queryResponse: Film[] = [];
  subscription: Subscription;

  constructor(
    public filmService: FilmService,
    public searchService: SearchService,
    public favoriteApiService: FavoriteApiService,
    public bookmarkApiService: BookmarkApiService
  ) { }

  //Загрузить список фильмов
  viewFilms(): void {
    this.filmService.getPopularFilms().subscribe(films => {
      this.isUploaded = false;
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

  //Поиск по названию фильма и имени актера
  searchQuery(data: string): void {
    this.query = data;
    if (this.query.length < 3) return;
    this.searchService.getQueryFilm(this.query).subscribe(data => {
      this.queryResponse = data;
      this.favoriteApiService.buildFavorites(this.queryResponse);
      this.bookmarkApiService.buildBookmarks(this.queryResponse);
    });
  }

  clearRequest() {
    this.query = '';
    this.queryResponse = [];
  }

  ngOnInit() {
    this.viewFilms();
  }
}
