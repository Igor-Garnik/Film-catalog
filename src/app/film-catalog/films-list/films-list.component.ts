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
  counter:number = 0;
  filmTitle:string = '';
  searchResult;

  constructor(public filmsService: FilmService) { }

  addToFavorite(value, film) {
    film.isFavorite = value;
    //this.counter = this.filmsList.filter(item => item.isFavorite).length;
    this.setFavoriteQuantity()
  }

  setFavoriteQuantity() {
    return this.filmsList.filter(item => item.isFavorite).length;
  }

  /* setQuantityText() {
		if (( this.counter % 100 > 4 && this.counter % 100 < 20 ) || this.counter % 10 === 0 || this.counter % 10 > 4 ) {
		  return `${this.counter} фильмов. `;
		} else if (this.counter % 10 < 5 && this.counter % 10 > 1 ) {
		  return `${this.counter} фильма. `;
		} else {
		  return `${this.counter} фильм. `;
		}
  } */

  
  filmsSort(arr, direct) {
    return arr.sort((a,b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1*direct;}
      if (x > y) {return 1*direct;}
      return 0;
    })
  }

  searchFilmByName(filmName) {
    if(filmName.length < 3) {
      this.searchResult = false;
    } else {
      //this.filmsService.getFilm(filmName);
      this.searchResult = this.filmsService.getSelectedFilm(filmName);
    }
  }

  ngOnInit() {
    this.filmsList = this.filmsService.getFilms();
  }

}
