import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { FilmService} from 'src/app/service/film.service';
import { ActorService } from 'src/app/service/actor.service';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Film } from 'src/app/models/film';
import { Actor } from 'src/app/models/actor';
import { SearchPipe } from 'src/app/shared/search.pipe';


@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})

export class FilmsListComponent implements OnInit {

  query:string = '';
  selected = 'default';
  page:number = 1;
  filmList:Film[] = [];
  actorList:Actor[] = [];
  viewList:string = 'film'
  isUploaded:boolean = true;

  sorting = [
    {value: 'films', viewValue: 'Показать фильмы'},
    {value: 'actors', viewValue: 'Показать актеров'}
  ]

  constructor(
    public actorService: ActorService,
    public filmService: FilmService,
    public dataService: DataService
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
    this.page ++;
    this.viewList === 'film' ? 
    this.viewFilms(this.page) : this.viewActors(this.page);
  }

  viewActors(page: number):void {
    this.actorService.getActor(page).subscribe(
      (actorsList: any) => {
        this.isUploaded = false;
        actorsList.results.forEach(actor => {
          this.actorList.push({
            title: actor.name,
            voteAverage: actor.popularity,
            posterPath: `${this.dataService.midImgPath}${actor['profile_path']}`
          });
        });
      },
      err => {
        console.log("error");
      }
    )
  }

  viewFilms(page: number):void {
    this.filmService.getFilm(page).subscribe(
      (filmsList: any) => {
        this.isUploaded = false;
        filmsList.results.forEach(film => {
          this.filmList.push({
            title: film.title,
            releaseDate: film.release_date,
            overview: film.overview,
            voteAverage: film.vote_average,
            posterPath: `${this.dataService.midImgPath}${film['poster_path']}`
          });
        });
      },
      err => {
      }
    )
  }

  getViewList() {
    return this.viewList ==='film' ? this.filmList : this.actorList;
  }

  ngOnInit() {
    this.viewFilms(this.page);
    this.viewActors(this.page);
  }
}
