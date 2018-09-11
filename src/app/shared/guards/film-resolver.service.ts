import { Injectable } from '@angular/core';
import { FilmService } from '../services/film.service'

@Injectable({
  providedIn: 'root'
})
export class FilmResolverService {

  constructor(private filmService: FilmService) { }

  /* resolve() {
    return this.filmService.loadFilms();
  } */
}
