import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"
import { API_CONFIG } from '../configs/api.config';
import { Config } from '../models/config';
import { UtilsService } from './../services/utils.service';
import { Actor } from '../models/actor';


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    @Inject(API_CONFIG) public apiConfig: Config
  ) { }

  page = 1;

  getPopularActors(page: number = this.page): Observable<Actor[]> {
    return this.http.get(`${this.apiConfig.personUrl}/popular?${this.apiConfig.params}page=${page}`)
      .pipe(map(data => {
        let actors = data['results'];
        this.page += 1;
        return this.setActors(actors);
      }))
  }

  getQueryActor(query): Observable<Actor[]> {
    return this.http.get(`${this.apiConfig.searchUrl}/person?${this.apiConfig.params}&query=${query}&page=1&include_adult=false`)
      .pipe(map(data => {
        let actors = this.utilsService.findExactOccurrence(data['results'], query, 'name');
        return this.setActors(actors);
      }))
  }

  getActorById(id): Observable<Actor> {
    return this.http.get(`${this.apiConfig.personUrl}/${id}?${this.apiConfig.params}&page=1&include_adult=false`)
      .pipe(map(actor => {
        return this.setActor(actor);
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

  setActors(actors): Actor[] {
    return actors.map(property => {
      return {
        id: property.id,
        title: property.name,
        voteAverage: property.popularity,
        posterPath: property.profile_path
      }
    })
  }

  setActor(actor) {
    return {
      id: actor.id,
      title: actor.name,
      voteAverage: actor.popularity,
      posterPath: actor.profile_path,
      birthday: actor.birthday,
      placeOfBirth: actor.place_of_birth
    }
  }

}
