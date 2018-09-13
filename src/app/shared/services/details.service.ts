import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../configs/api.config';
import { Config } from '../models/config';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Actor } from '../models/actor';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) public apiConfig: Config
  ) { }


  loadVideo(filmId): Observable<Video[]> {
    return this.http.get(`${this.apiConfig.movieUrl}/${filmId}/videos?${this.apiConfig.params}`)
      .pipe(
        pluck('results'),
        map(data => {
          return this.setVideo(data);
        })
      )
  }

  setVideo(films): Video[] {
    return films.map(film => {
      return {
        name: film.name,
        key: film.key,
        type: film.type,
        size: film.size
      }
    })
  }

  loadAccount(sessionId: string): Observable<any> {
    return this.http.get(`${this.apiConfig.authUrl}/account?${this.apiConfig.apiKey}&session_id=${sessionId}`)
      .pipe(
        map((data: any) => {
          return data.username;
        })
      )
  }

  loadFilmDetails(filmId): Observable<any> {
    return this.http.get(`${this.apiConfig.movieUrl}/${filmId}?${this.apiConfig.params}`)
      .pipe(
        map(data => {
          return this.setDetails(data);
        })
      )
  }

  loadImages(filmId): Observable<any> {
    return this.http.get(`${this.apiConfig.movieUrl}/${filmId}/images?${this.apiConfig.apiKey}&language=en`)
      .pipe(
        map((data: any) => {
          return this.setPoster(data.posters);
        })
      )
  }

  setPoster(posterList): Array<string> {
    return posterList.map(poster => {
      return {
        posterPath: poster.file_path,
        height: poster.height,
        width: poster.width
      }
    })
  }

  setDetails(details): Object {
    return {
      release: details.release_date,
      language: details.original_language,
      runtime: details.runtime,
      butget: details.budget,
      company: details.production_companies[0].name,
      country: details.production_countries[0].name,
      genres: this.setGenres(details.genres),
      title: details.original_title
    }
  }

  setGenres(genres): Array<any> {
    return genres.map(genre => {
      return genre.name;
    })
  }


}
