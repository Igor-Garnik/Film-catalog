import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from '../../shared/services/film.service';
import { ActorService } from '../../shared/services/actor.service';
import { SearchService } from '../../shared/services/search.service';
import { Film } from './../../shared/models/film';
import { Actor } from './../../shared/models/actor';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(
    private filmService: FilmService,
    private searchService: SearchService,
    private actorService: ActorService,
    private router: Router,
  ) { }

  firstPopularFilm: Film;
  secondPopularFilm: Film;
  thirdPopularFilm: Film;
  firstNowFilm: Film;
  secondNowFilm: Film;
  thirdNowFilm: Film;
  actorList: Actor[];
  isLoading: boolean = true;
  state: string = 'main';
  subscription: Subscription;
  page: number = 1;

  loadPopularFilms(): void {
    this.filmService.loadFilms(this.page, 'popular')
      .pipe(take(3))
      .subscribe(films => {
        this.isLoading = false;
        [this.firstPopularFilm, this.secondPopularFilm, this.thirdPopularFilm] = films;
      })
  }

  loadNowPlayingFilms(): void {
    this.filmService.loadFilms(this.page, 'now_playing')
      .pipe(take(3))
      .subscribe(films => {
        this.isLoading = false;
        [this.firstNowFilm, this.secondNowFilm, this.thirdNowFilm] = films;
      })
  }

  getActors(): void {
    this.actorService.getDashboardActors().subscribe(actors => {
      this.actorList = actors;
    })
  }

  redirect() {
    this.subscription = this.searchService.getQuery().subscribe(() => {
      this.router.navigate(["/movie"]);
    })
  }

  ngOnInit() {
    this.filmService.getLocalStorage();
    this.loadNowPlayingFilms();
    this.loadPopularFilms();
    this.getActors();
    this.searchService.setState(this.state);
    this.redirect();
  }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : null;
  }

}
