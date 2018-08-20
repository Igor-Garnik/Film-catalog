import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"
import { API_CONFIG } from '../shared/api.config';
import { Config } from '../shared/config';
import { UtilsService } from './../service/utils.service';
import { Actor } from '../models/actor';


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    @Inject(API_CONFIG) public apiConfig: Config,
  ) { }

  page = 1;

  getPopularActors(page: number = this.page): Observable<Actor[]> {
    return this.http.get(`${this.apiConfig.personUrl}/popular?${this.apiConfig.params}page=${page}`)
      .pipe(map(data => {
        let actors = data['results'];
        this.page += 1;
        return this.setActor(actors);
      }))
  }

  getQueryActor(query): Observable<Actor[]> {
    return this.http.get(`${this.apiConfig.searchUrl}/person?${this.apiConfig.params}&query=${query}&page=1&include_adult=false`)
      .pipe(map(data => {
        let actors = this.utilsService.findExactOccurrence(data['results'], query, 'name');
        return this.setActor(actors);
      }))
  }

  getDashboardActors(): Observable<Actor[]> {
    return this.http.get(`${this.apiConfig.personUrl}/popular?${this.apiConfig.params}page=1`)
      .pipe(map(data => {
        let actors = data['results'];
        this.page += 1;
        let res = actors.map(actor => {
          return {
            title: actor.name,
            posterPath: actor.profile_path
          }
        })
        return res.splice(0, 6);
      }))
  }

  setActor(actors): Actor[] {
    return actors.map(property => {
      return {
        title: property.name,
        voteAverage: property.popularity,
        posterPath: property.profile_path
      }
    })
  }

}
