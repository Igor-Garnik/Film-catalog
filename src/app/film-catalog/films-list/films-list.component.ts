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
  basicListQuantity:number;
  query:string = '';
  filmsList;
  selected = '';
  searchResult;
  counter:number;
  quantity:number = 3;
  disabled:boolean = false;
  page:number = 1;
  filmsQuantity = [
    {value: 2, viewValue: '2 элемента'},
    {value: 3, viewValue: '3 элемента'},
    {value: 4, viewValue: '4 элемента'}
  ];

  sorting = [
    {value: 'default', viewValue: 'По умолчанию'},
    {value: 'ASC', viewValue: 'По алфавиту: А-Я'},
    {value: 'DESC', viewValue: 'По алфавиту: Я-А'}
  ];

  constructor(public filmsService: FilmService) { }

  //Вычисление окончания слова ' Фильм'
  setQuantityText(counter) {
		if (( counter % 100 > 4 && counter % 100 < 20 ) || counter % 10 === 0 || counter % 10 > 4 ) {
		  return `В избранном: ${counter} фильмов. `;
		} else if ( counter % 10 < 5 && counter % 10 > 1 ) {
		  return `В избранном: ${counter} фильма. `;
		} else {
		  return `В избранном: ${counter} фильм. `;
		}
  }
  
  //Сортировка списка фильмов
  sortFilm(selected) {
    this.filmsService.createNewFilmsList(selected);
    this.filmsList = this.filmsService.getPage(this.page, this.quantity);
  }

  //Добавление в избранное
  addToFavorite(value, film) {
    film.isFavorite = value;
    this.setFavoriteQuantity()
  }

  //Вычисление количества избранных фильмов
  setFavoriteQuantity() {
    let list = this.filmsService.getFilmsList();
    return list.filter(item => item.isFavorite).length;
  }
  
  //Поиск фильма по названию
  searchFilmByName(query) {
    let result = this.filmsService.getSelectedFilm(query.trim());

    if(result.length > 0 && query.length > 3) {
      this.filmsList = result;
    }
  }

  //Добавление порции данных
  addPage() {
    this.page ++;
    this.filmsList = this.filmsList.concat(this.filmsService.getPage(this.page, this.quantity));
    console.log(this.page);
  }

  //Блокировка кнопки 
  disableBtn() {
    return this.basicListQuantity == this.filmsList.length ? true : false;
  }

  ngOnInit() {
    this.filmsService.createNewFilmsList('')
    this.filmsList = this.filmsService.getPage(this.page, this.quantity);
    this.basicListQuantity = this.filmsService.getFilmsList().length;
  }
}
