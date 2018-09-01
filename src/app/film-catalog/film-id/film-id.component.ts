import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilmService } from '../../shared/services/film.service';
import { Film } from '../../shared/models/film'
import { mergeMap, map } from 'rxjs/operators';
import { ListConfig } from '../../shared/models/listConfig';


@Component({
  selector: 'app-film-id',
  templateUrl: './film-id.component.html',
  styleUrls: ['./film-id.component.css']
})
export class FilmIdComponent implements OnInit {

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) { }

  id: number;
  film: Film;
  request = {
    favorite: 'favorite',
    watchlist: 'watchlist'
  }

  showFilm() {
    this.route.paramMap
      .pipe(
        mergeMap((params: ParamMap) => {
          this.id = +params.get("id");
          return this.filmService.getFilmById(this.id)
            .pipe(
              map((film: Film) => {
                this.film = film;
              }))
        }))
      .subscribe();
  }

  addToFavorites() {
    this.film.isFavorite = !this.film.isFavorite;
    let config = {
      "media_type": "movie",
      "media_id": this.film.id,
      "favorite": this.film.isFavorite
    }
    this.filmService.setFavoritesOrWatchlist(config, this.request.favorite)
      .subscribe();
  }

  addToWatchList() {
    this.film.isWatchList = !this.film.isWatchList;
    let config = {
      "media_type": "movie",
      "media_id": this.film.id,
      "watchlist": this.film.isWatchList
    }
    this.filmService.setFavoritesOrWatchlist(config, this.request.watchlist)
      .subscribe();
  }

  ngOnInit() {
    this.filmService.getLocalStorage();
    this.showFilm();
  }

}
