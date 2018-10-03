import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { FilmsListComponent } from '../../film-catalog/films-list/films-list.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmsListComponent: FilmsListComponent
  ) { }

  page$ = new Subject<number>();
  isUploaded$ = new Subject<boolean>();

  checkErrroMessage(message) {
    return message.length == 0 ? true : false;
  }

  scrorollToTop(): void {
    window.scrollTo(0, 0);
  }

  setPage(page): void {
    this.page$.next(page)
  }

  getPage(): Observable<number> {
    return this.page$.asObservable();
  }

  setIsUploaded(isUploaded): void {
    this.isUploaded$.next(isUploaded);
  }

  getIsUploaded(): Observable<boolean> {
    return this.isUploaded$.asObservable();
  }

  checkParam(param: string, kindOfFilmsList: string): string {
    return param !== null ? param : kindOfFilmsList;
  }

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


