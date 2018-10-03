import { Injectable } from '@angular/core';
import { FilmsListComponent } from '../../film-catalog/films-list/films-list.component';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  constructor(private filmsListComponent: FilmsListComponent) { }

  toggleFilmList(kindOfFilmsList: string): void {
    switch (kindOfFilmsList) {
      case 'similar': this.filmsListComponent.viewSimilarFilms();
        break;
      case 'credits': this.filmsListComponent.viewMovieCreditsFilms();
        break;
      case 'favorites': this.filmsListComponent.viewFavoritesFilms();
        break;
      case 'watchlist': this.filmsListComponent.getWatchLIstFilms();
        break;
      case 'upcoming': this.filmsListComponent.viewDifferentFilmsList(kindOfFilmsList); //передача параметра запроса
        break;
      case 'top_rated': this.filmsListComponent.viewDifferentFilmsList(kindOfFilmsList);
        break;
      case 'now_playing': this.filmsListComponent.viewDifferentFilmsList(kindOfFilmsList);
        break;
      default:
        this.filmsListComponent.viewDifferentFilmsList(); //параметр запросы по умолчанию
    }
  }
}
