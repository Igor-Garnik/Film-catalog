import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable, Subject } from 'rxjs';

import { SearchService } from './../../service/search.searvice';
import { FilmService } from './../../service/film.service';
import { ActorService } from './../../service/actor.service';
import { FavoriteApiService } from '../../service/favorite.api.service';
import { BookmarkApiService } from '../../service/bookmark.api.service';
import { MessageService } from './../../service/message.service';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Film } from './../../models/film';
import { Actor } from './../../models/actor';
import { Bookmark } from './../../models/bookmark';
import { Favorite } from './../../models/favorite';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  query: string = '';
  selected = 'default';
  page: number = 1;
  filmList: Film[] = [];
  actorList: Actor[] = [];
  viewList: string = 'film';
  isUploaded: boolean = true;
  queryResponse: Array<{}> = [];
  viewQueryResults: string;
  subscription: Subscription;

  sorting = [
    { value: 'films', viewValue: 'Показать фильмы' },
    { value: 'actors', viewValue: 'Показать актеров' }
  ];

  constructor(
    public actorService: ActorService,
    public filmService: FilmService,
    public searchService: SearchService,
    public favoriteApiService: FavoriteApiService,
    public bookmarkApiService: BookmarkApiService,
    public messageService: MessageService
  ) { }

  //Поиск по названию фильма и имени актера
  searchQuery(data: string): void {
    this.query = data;
    if (this.query.length < 3) return;
    if (this.selected === 'films' || this.selected === 'default') {
      this.searchService.getQueryFilm(this.query).subscribe(data => {
        this.queryResponse = data;
        this.viewQueryResults = 'film';
      });
    } else {
      this.searchService.getQueryActor(this.query).subscribe(data => {
        this.isUploaded = false;
        this.queryResponse = data;
        this.viewQueryResults = 'actor';
      });
    }
  }

  clearRequest() {
    this.query = '';
    this.queryResponse = [];
  }

  //Сортировка по фильмам или актерам
  toggleList(selected: string): void {
    this.clearRequest();
    selected === 'films' ? (this.viewList = 'film') : (this.viewList = 'actor');
  }

  //Добавление страницы
  addPage(): void {
    this.viewList === 'film' ? this.viewFilms() : this.viewActors();
  }

  //Загрузить список актеров
  viewActors(): void {
    this.actorService.getPopularActors().subscribe(actors => {
      this.isUploaded = false;
      this.actorList = [...this.actorList, ...actors];
    });
  }


  //Загрузить список фильмов
  viewFilms(): void {
    this.filmService.getPopularFilms().subscribe(films => {
      this.isUploaded = false;
      this.filmList = [...this.filmList, ...films];
    });
  }

  //Отобразить список актеров или фильмов
  getViewList() {
    return this.viewList === 'film' ? this.filmList : this.actorList;
  }

  buildFavorites() {
    this.favoriteApiService.getFavorite(this.filmList.map(film => film.id))
      .subscribe((favorites: Array<Favorite>) => {
        const favoriteList = favorites.map(favorite => favorite.id);
        this.filmList.map(film => {
          film.isFavorite = favoriteList.indexOf(film.id) > -1;
        });
      },
        err => {
          console.log('favorite request error');
        }
      );
  }

  buildBookmarks() {
    this.bookmarkApiService.getBookmarks(this.filmList.map(film => film.id))
      .subscribe((bookmarks: Array<Bookmark>) => {
        const bookmarkList = bookmarks.map(bookmark => bookmark.id);
        this.filmList.map(film => {
          film.isCheked = bookmarkList.indexOf(film.id) > -1;
        });
      },
        err => {
          console.log('favorite request error');
        }
      );
  }

  setStar(id: number) {
    const foundFilm = this.filmList.find((film: Film) => {
      return film.id === id;
    });
    if (foundFilm.isFavorite) {
      this.favoriteApiService
        .removeFromFavorites(id)
        .subscribe(() => this.buildFavorites());
    } else {
      this.favoriteApiService
        .addToFavorite(id)
        .subscribe(() => this.buildFavorites());
    }
  }

  setBookmark(id: number) {
    const foundFilm = this.filmList.find((film: Film) => {
      return film.id === id;
    });
    if (foundFilm.isCheked) {
      this.bookmarkApiService
        .removeFromBookmarks(id)
        .subscribe(() => this.buildFavorites());
    } else {
      this.bookmarkApiService
        .addToBookmarks(id)
        .subscribe(() => this.buildFavorites());
    }
  }

  ngOnInit() {
    this.viewFilms();
    this.viewActors();
  }
}
