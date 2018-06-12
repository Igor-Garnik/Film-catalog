import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {

  description: string = 'Middle card description';
  filmsList = null;
  filmTitle:string = '';
  searchResult;
  counter:number = 3
  filmsQuantity:number;
  addItems:number = 3;
  disabled:boolean = false;
  direction:number;

  constructor(public filmsService: FilmService) { }

  addToFavorite(value, film) {
    film.isFavorite = value;
    this.setFavoriteQuantity()
  }

  setFavoriteQuantity() {
    return this.filmsList.filter(item => item.isFavorite).length;
  }

  filmsSort(arr, direct) {
    this.direction = direct;
    return arr.sort((a,b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1*direct;}
      if (x > y) {return 1*direct;}
      return 0;
    })
  }
  
  getInitialList() {
    this.filmsList = this.filmsService.getFilms(this.counter);
  }

  /* searchFilmByName(filmName) {
    if(filmName.length < 3) {
      this.searchResult = false;
    } else {
      this.searchResult = this.filmsService.getSelectedFilm(filmName);
    }
  } */

  searchFilmByName(filmName) {
    this.searchResult = filmName.length < 3 ? false : this.filmsService.getSelectedFilm(filmName)
  }

  addFilms(number) {
    this.counter += number; 
    this.filmsList = this.filmsService.getFilms(this.counter); 
    this.filmsSort(this.filmsList, this.direction);
  }

  disableBtn() {
    return this.counter === this.filmsQuantity ? true : false;
  }

  ngOnInit() {
    this.filmsList = this.filmsService.getFilms(this.counter);
    this.filmsQuantity = this.filmsService.getFilmsQuantity();
  }

}
