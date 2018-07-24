import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Film } from './../models/film'
import { API_CONFIG } from '../shared/api.config';
import { Config } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) public apiConfig: Config) { }

  getQueryFilm(query: string): any {
    console.log(query);
    return this.http.get(`${this.apiConfig.searchUrl}/movie?${this.apiConfig.params}&query=${query}&page=1`)
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
    return this.http.get(`${this.apiConfig.searchUrl}/person?${this.apiConfig.params}&query=${query}&page=1&include_adult=false`)
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
      return item[title].toLowerCase().substring(0, query.length).includes(query.toLowerCase().trim())
    })
  }

}



