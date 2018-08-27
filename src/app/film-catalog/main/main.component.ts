import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from '../../service/film.service';
import { ActorService } from '../../service/actor.service';
import { SearchService } from '../../service/search.service';
import { Film } from './../../models/film';
import { Actor } from './../../models/actor';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';


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

  filmList: Film[];
  actorList: Actor[];
  isLoading: boolean = true;
  state: string = 'main';
  subscription: Subscription;

  getFilms(): void {
    this.filmService.getDashboardFilms().subscribe(films => {
      this.isLoading = false;
      this.filmList = films;
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
    this.getFilms();
    this.getActors();
    this.searchService.setState(this.state);
    this.redirect();
  }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : null;
  }

}
