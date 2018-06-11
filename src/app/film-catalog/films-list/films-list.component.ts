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

  constructor(public filmsService: FilmService) { }

  addToFavorite(value, film) {
    console.log(this.filmsList);
    film.isFavorite = value;
    this.counter = this.filmsList.filter(item => item.isFavorite).length;
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

  ngOnInit() {
    this.filmsList = this.filmsService.getFilms()
  }

}
