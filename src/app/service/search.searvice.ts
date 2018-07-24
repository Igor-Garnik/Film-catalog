import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/data.service';
import { map } from 'rxjs/operators';
import { Film } from './../models/film'

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, public dataService: DataService) { }

  getQueryFilm(query: string): any {
    return this.http.get(`${this.dataService.searchUrl}/movie?${this.dataService.params}&query=${query}&page=1`)
      .pipe(map(data => {
        let film = this.findExactOccurrence(data['results'], query, 'title');
        return film.map(property => {
          return {
            title: property.title,
            releaseDate: property.release_date,
            overview: property.overview,
            voteAverage: property.vote_average,
            posterPath: property.poster_path,
            id: property.id
          }
        })
      }))
  }

  getQueryActor(query: string): any {
    return this.http.get(`${this.dataService.searchUrl}/person?${this.dataService.params}&query=${query}&page=1&include_adult=false`)
      .pipe(map(data => {
        let actor = this.findExactOccurrence(data['results'], query, 'name');
        return actor.map(property => {
          return {
            title: property.name,
            voteAverage: property.popularity,
            posterPath: property.profile_path
          }
        })
      }))
  }

  findExactOccurrence(list, query: string, title): any {
    return list.filter(item => {
      return item[title].toLowerCase().substring(0, 3).includes(query.toLowerCase().trim())
    })
  }

}



