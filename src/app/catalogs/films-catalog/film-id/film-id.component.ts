import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilmApiService } from '../shared/film-API.service';
import { Film } from '../shared/film'
import { ActorService } from '../../actors-catalog/shared/actor.service';
import { Actor } from '../../actors-catalog/shared/actor'
import { mergeMap, map } from 'rxjs/operators';
import { ListConfig } from '../../../shared/models/listConfig';
import { DetailsService } from '../../../shared/services/details.service';
import { Video } from '../../../shared/models/video';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { UtilsService } from '../../../shared/services/utils.service';


@Component({
  selector: 'app-film-id',
  templateUrl: './film-id.component.html',
  styleUrls: ['./film-id.component.css']
})
export class FilmIdComponent implements OnInit {

  constructor(
    private filmApiService: FilmApiService,
    private actorService: ActorService,
    private detalesService: DetailsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private utilsService: UtilsService
  ) { }

  filmId: number;
  posters: Array<string>;
  film: Film;
  crew: Actor[];
  chosenCharacter: Actor[];
  filmDetails: Array<any>;
  request = {
    favorite: 'favorite',
    watchlist: 'watchlist'
  }
  video: Video[];
  player: YT.Player;
  isUploaded: boolean = true;
  cardView: 'backdrop'

  //Получение и отображение фильма
  showFilm() {
    this.route.paramMap
      .pipe(
        mergeMap((params: ParamMap) => {
          this.filmId = +params.get("id");
          this.getCrew();
          this.getVideos();
          this.getDetails();
          this.getPosters();
          return this.filmApiService.loadFilmById(this.filmId)
            .pipe(
              map((film: Film) => {
                this.utilsService.setIsUploaded(this.isUploaded = false);
                this.film = film;

              }))
        }))
      .subscribe();
  }

  //Добавление в избранные
  addToFavorites() {
    this.film.isFavorite = !this.film.isFavorite;
    let config = this.setConfig(this.film.id, this.film.isFavorite, this.request.favorite);
    this.filmApiService.setFavoritesOrWatchlist(config, this.request.favorite)
      .subscribe();
  }

  //Добавление в список
  addToWatchList() {
    this.film.isWatchList = !this.film.isWatchList;
    let config = this.setConfig(this.film.id, this.film.isFavorite, this.request.watchlist);
    this.filmApiService.setFavoritesOrWatchlist(config, this.request.watchlist)
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

  getCrew(): void {
    this.actorService.loadCrew(this.filmId)
      .subscribe((crew: Array<any>) => {
        this.utilsService.setIsUploaded(this.isUploaded = false);
        this.crew = [...crew[1]].splice(0, 5);
      });
  }

  getVideos(): void {
    this.detalesService.loadVideo(this.filmId)
      .subscribe((video: Video[]) => {
        this.utilsService.setIsUploaded(this.isUploaded = false);
        this.video = video;
      });
  }

  getDetails(): void {
    this.detalesService.loadFilmDetails(this.filmId)
      .subscribe(data => {
        this.utilsService.setIsUploaded(this.isUploaded = false);
        this.filmDetails = data;
      });
  }

  getPosters(): void {
    this.detalesService.loadImages(this.filmId)
      .subscribe(images => {
        this.utilsService.setIsUploaded(this.isUploaded = false);
        this.posters = images;
      });
  }

  openModal() {
    this.dialog.open(ModalComponent, {
      data: { video: this.video[0].key, name: this.video[0].name }
    });
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }

  ngOnInit() {
    this.filmApiService.getLocalStorage();
    this.showFilm();
    this.utilsService.setIsUploaded(this.isUploaded);
    this.utilsService.scrorollToTop();
  }

}
