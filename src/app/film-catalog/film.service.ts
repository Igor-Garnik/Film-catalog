import { Injectable } from '@angular/core'; 
import { Observable, Subject } from 'rxjs';
import { Identifiers } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'  
})
export class FilmService {
  apiUrl: string = "https://api.themoviedb.org/3"
  apiKey: string = 'df219c5486f4e7b2218cb6ee83ed1723'
  movieUrl: string = `${this.apiUrl}/movie`
  searchUrl: string = `${this.apiUrl}/search`
  personUrl: string = `${this.apiUrl}/person`
  params: string = `api_key=${this.apiKey}&language=ru-RU&`

  imgPath: string = 'https://image.tmdb.org/t/p'
  midImgPath: string = `${this.imgPath}/w500`
  smallImgPath: string = `${this.imgPath}/w185`
  bigBackPath: string = `${this.imgPath}/w1280`
  midBackPath: string = `${this.imgPath}/w780`
  smallBackPath: string = `${this.imgPath}/w300`


  constructor(
    private http: HttpClient
  ) {}
  newList;
  sortedList;

  //Получение списка фильмов с "https://developers.themoviedb.org/3/movies"
  getData (page: number, select) {
    let result = (select === "films" || select === "default") ? this.movieUrl : this.personUrl;
    return this.http.get(`${result}/popular?${this.params}page=${page}`); 
  }

  /* //Создание копии списка фильмов
  createNewFilmsList(param) {
    this.doSort(param)
    this.newList = [...this.sortedList];
  }

  //Определение метода сортировки
  doSort(selected) {
    if(selected == 'default' || selected == '') {
      this.sortedList = this.filmsSort('id', 1);
    } else {
      let number = selected === 'ASC' ? 1 : -1;
      this.sortedList = this.filmsSort('name', number);
    }
  }

  //Сортировка списка фильмов
  filmsSort(param, direct) {
    let x;
    let y;
    let value = param == 'id' ? "id" : "name"
    return this.films.sort((a,b) => {
      if(value == 'id') {
        x = a.id;
        y = b.id;
        if (x < y) {return -1*direct;}
        if (x > y) {return 1*direct;}
        return 0;
      } else {
        x = a.name.toLowerCase();
        y = b.name.toLowerCase();
        if (x < y) {return -1*direct;}
        if (x > y) {return 1*direct;}
        return 0;
      }
    })
  }

  //Получение масива фильмов для компонента
  getFilmsList() {
    return this.films;
  }

  //Получение порции данных
  getPage(page, param) {
    return this.newList.splice(0,param);
  }

  //Поиск искомого фильма в списке
  getSelectedFilm(filmName) {
    return this.films.filter(item => (item.name.toLowerCase().indexOf(filmName)) === 0);
  } */
}

