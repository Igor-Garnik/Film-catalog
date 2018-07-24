import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Identifiers } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"
import { API_CONFIG } from '../shared/api.config';
import { Config } from '../shared/config';


@Injectable({
  providedIn: 'root'
})
export class ActorService {
  page = 1;
  constructor(private http: HttpClient, @Inject(API_CONFIG) public apiConfig: Config) { }

  getPopularActors(page: number = this.page) {
    return this.http.get(`${this.dataService.personUrl}/popular?${this.dataService.params}page=${page}`)
      .pipe(map(data => {
        let actors = data['results'];
        this.page += 1;
        return actors.map(actor => {
          return {
            title: actor.name,
            voteAverage: actor.popularity,
            posterPath: actor.profile_path
          }
        })
      }))
  }
}
