import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from './../../service/data.service';
import { FilmService} from './../../service/film.service';
import { ActorService } from './../../service/actor.service';
import { FavoriteService } from '../../service/favorite.service';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Film } from './../../models/film';
import { Actor } from './../../models/actor';

import { SearchPipe } from './../../shared/pipes/search.pipe';

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})

export class FilmsListComponent implements OnInit {

  query:string = '';
  selected = 'default';
  page:number = 1;
  filmList:Array<Film> = [];
  actorList:Array<Actor> = [];
  viewList:string = 'film'
  isUploaded:boolean = true;
  obj:Object;

  sorting = [
    {value: 'films', viewValue: 'Показать фильмы'},
    {value: 'actors', viewValue: 'Показать актеров'}
  ]

  constructor(
    public actorService: ActorService,
    public filmService: FilmService,
    public dataService: DataService,
    public favoriteService : FavoriteService
  ) { }

  updateParent(data:string): void {
    this.query = data;
  }

  //Сортировка по фильмам или актерам
  toggleList(selected:string):void {
    (selected === "films") ? this.viewList = 'film' : this.viewList = 'actor';
  }

  //Добавление страницы
  addPage():void {
    this.viewList === 'film' ? 
    this.viewFilms() : this.viewActors();
  }

  //Загрузить список актеров
  viewActors():void {
    this.actorService.getPopularActors()
      .subscribe(actors => {
        this.isUploaded = false;
        this.actorList = [...this.actorList, ...actors]
      })
  }

  //Загрузить список фильмов
  viewFilms():void {
    this.filmService.getPopularFilms()
    .subscribe(films => {
      this.isUploaded = false;
      this.filmList = [...this.filmList, ...films];
    })
  }

  //Отобразить список актеров или фильмов
  getViewList() {
    return this.viewList ==='film' ? this.filmList : this.actorList;
  }

  /* buildFavorites() {
    this.favoriteService.getFavorite(this.filmList.map(film => film.id)).subscribe((favorites: Array<Favorite>))
      const favoriteList = favorites.map(favorite => favorite._id);
      this.filmList.map(film => {
        film.isFavorite = favoriteList.indexOf(film.id) > -1;
      });
  }

  starFilm(id: number) {
    const foundFilm = this.filmList.find((film: Film) => {
      return film.id === id;
    });
    if(foundFilm.isFavorite) {
      this.favoriteService.removeFromFavorites(id).subscribe( () => this.buildFavorites())
    } else {
      this.favoriteService.addToFavorite(id).subscribe( () => this.buildFavorites());
    }
  } */

  ngOnInit() {
    this.viewFilms()
    this.viewActors()
  }
}
