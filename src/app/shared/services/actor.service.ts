import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, pluck } from "rxjs/operators"
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

  loadPopularActors(page: number = this.page): Observable<Actor[]> {
    return this.http.get(`${this.apiConfig.personUrl}/popular?${this.apiConfig.params}page=${page}`)
      .pipe(map(data => {
        let actors = data['results'];
        this.page += 1;
        return this.setActors(actors);
      }))
  }

  loadQueryActor(query): Observable<Actor[]> {
    return this.http.get(`${this.apiConfig.searchUrl}/person?${this.apiConfig.params}&query=${query}&page=1&include_adult=false`)
      .pipe(map(data => {
        let actors = this.utilsService.findExactOccurrence(data['results'], query, 'name');
        return this.setActors(actors);
      }))
  }

  loadActorById(id): Observable<Actor> {
    return this.http.get(`${this.apiConfig.personUrl}/${id}?${this.apiConfig.params}&page=1&include_adult=false`)
      .pipe(map(actor => {
        return this.setActorDetails(actor);
      }))
  }


  loadDashboardActors(): Observable<Actor[]> {
    return this.http.get(`${this.apiConfig.personUrl}/popular?${this.apiConfig.params}page=1`)
      .pipe(
        pluck('results'),
        map(data => {
          return this.setActors(data);
        })
      )
  }

  loadCrew(filmId: number): Observable<Actor[]> {
    return this.http.get(`${this.apiConfig.movieUrl}/${filmId}/credits?${this.apiConfig.params}`)
      .pipe(
        map(data => {
          let credits: Array<any> = [];
          credits.push(this.setCredits(data['cast'], 'character'));
          credits.push(this.setCredits(data['crew'], 'job'));
          return credits;
        })
      )
  }

  loadImages(filmId): Observable<any> {
    return this.http.get(`${this.apiConfig.personUrl}/${filmId}/images?${this.apiConfig.apiKey}`)
      .pipe(
        pluck('profiles'),
        map(data => {
          return this.setImage(data);
        })
      )
  }

  setImage(data): Array<any> {
    return data.map(image => {
      return {
        path: image.file_path,
        width: image.width,
        height: image.height
      }
    })
  }

  setActors(actors): Actor[] {
    return actors.map(actor => {
      return {
        id: actor.id,
        name: actor.name,
        voteAverage: actor.popularity,
        posterPath: actor.profile_path,
      }
    })
  }

  setActorDetails(actor) {
    return {
      id: actor.id,
      name: actor.name,
      voteAverage: actor.popularity,
      posterPath: actor.profile_path,
      birthday: actor.birthday,
      deathday: this.setdeathDay(actor.deathday),
      alsoKnownAs: actor.also_known_as.map(name => name),
      biography: actor.biography,
      placeOfBirth: actor.place_of_birth,
    }
  }

  setdeathDay(data): string {
    return data === null ? 'alive' : data;
  }

  setCredits(credits, job): Actor[] {
    return credits.map(person => {
      return {
        id: person.id,
        name: person.name,
        role: person[job],
        posterPath: person.profile_path
      }
    })
  }

}

