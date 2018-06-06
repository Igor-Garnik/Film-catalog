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

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    this.filmsList = this.filmsService.getFilms()
  }

}
