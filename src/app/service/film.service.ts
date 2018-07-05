import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/data.service';
import { Film } from './../models/film';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  page = 1;

  constructor(private http: HttpClient, public dataService: DataService) { 
  }

  getPopularFilms (page: number = this.page)  {
    return this.http.get(`${this.dataService.movieUrl}/popular?${this.dataService.params}page=${page}`)
    .pipe(map(data => {
      let films = data['results'];
      this.page += 1;
      return films.map(film => {
        return {
          title: film.title,
          releaseDate: film.release_date,
          overview: film.overview,
          voteAverage: film.vote_average,
          posterPath: film.poster_path,
          id: film.id 
        }
      })
    }))
  }
  
}
