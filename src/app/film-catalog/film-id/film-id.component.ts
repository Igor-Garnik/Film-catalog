import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilmService } from '../../shared/services/film.service';
import { Film } from '../../shared/models/film'
import { ActorService } from '../../shared/services/actor.service';
import { Actor } from '../../shared/models/actor'
import { mergeMap, map } from 'rxjs/operators';
import { ListConfig } from '../../shared/models/listConfig';
import { DetailsService } from '../../shared/services/details.service';
import { Video } from '../../shared/models/video';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';


@Component({
  selector: 'app-film-id',
  templateUrl: './film-id.component.html',
  styleUrls: ['./film-id.component.css']
})
export class FilmIdComponent implements OnInit {

  constructor(
    private filmService: FilmService,
    private actorService: ActorService,
    private detalesService: DetailsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  id: number;
  film: Film;
  character: Actor[];
  job: Actor[];
  mainJob: Actor[];
  chosenCharacter: Actor[];
  filmDetails: Array<any>;
  request = {
    favorite: 'favorite',
    watchlist: 'watchlist'
  }
  video: Video[];

  //Получение и отображение фильма
  showFilm() {
    this.route.paramMap
      .pipe(
        mergeMap((params: ParamMap) => {
          this.id = +params.get("id");
          this.getCreits();
          this.getVideos();
          this.getDetails();
          return this.filmService.loadFilmById(this.id)
            .pipe(
              map((film: Film) => {
                this.film = film;
              }))
        }))
      .subscribe();
  }

  //Добавление в избранные
  addToFavorites() {
    this.film.isFavorite = !this.film.isFavorite;
    let config = this.setConfig(this.film.id, this.film.isFavorite, this.request.favorite);
    this.filmService.setFavoritesOrWatchlist(config, this.request.favorite)
      .subscribe();
  }

  //Добавление в список
  addToWatchList() {
    this.film.isWatchList = !this.film.isWatchList;
    let config = this.setConfig(this.film.id, this.film.isFavorite, this.request.watchlist);
    this.filmService.setFavoritesOrWatchlist(config, this.request.watchlist)
      .subscribe();
  }

  //Описание объекта для передачи в movie DB
  setConfig(id: number, isChecked: boolean, type: string) {
    let config = new ListConfig();
    config['media_type'] = "movie";
    config['media_id'] = id;
    config[type] = isChecked;
    return config;
  }

  getCreits(): void {
    this.detalesService.loadCredits(this.id)
      .subscribe((role: {}) => {
        this.character = [...role[0]];
        this.job = [...role[1]];
        this.chosenCharacter = this.character.splice(0, 18);
        this.mainJob = this.job.splice(0, 5)
      });
  }


  getVideos(): void {
    this.detalesService.loadVideo(this.id)
      .subscribe((video: Video[]) => {
        this.video = [...video];
      });
  }

  getDetails(): void {
    this.detalesService.loadFilmDetails(this.id)
      .subscribe(data => {
        this.filmDetails = data
      });
  }

  openModal() {
    this.dialog.open(ModalComponent, {
      data: { video: this.video[0].key, name: this.video[0].name }
    });
  }

  ngOnInit() {
    this.filmService.getLocalStorage();
    this.showFilm();
  }

}
