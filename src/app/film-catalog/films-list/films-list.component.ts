import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {

  description: string = 'Middle card description';
  filmsList = null;
  counter:number = 0
  checkedFilm:{};

  constructor(public filmsService: FilmService) { }

  addToFavorite(value, film) {
    console.log(this.filmsList);
    film.isFavorite = value;
    this.counter = this.filmsList.filter(item => item.isFavorite).length;
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

  setQuantityText() {
		if (( this.counter % 100 > 4 && this.counter % 100 < 20 ) || this.counter % 10 === 0 || this.counter % 10 > 4 ) {
		  return 0;
		} else if (this.counter % 10 < 5 && this.counter % 10 > 1 ) {
		  return 1;
		} else {
		  return 2;
		}
  }
  
  filmsSort(arr, direct) {
    return arr.sort((a,b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1*direct;}
      if (x > y) {return 1*direct;}
      return 0;
    })
  }

  
  
  //films = mySort(films, 1)

  ngOnInit() {
    this.filmsList = this.filmsService.getFilms()
  }

}
