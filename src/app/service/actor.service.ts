import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Identifiers } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/data.service'
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  page = 1;
  constructor(private http: HttpClient, public dataService: DataService) {}

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
