import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../service/film.service';
import { ActorService } from '../../service/actor.service';
import { SearchService } from '../../service/search.service';
import { Film } from './../../models/film';
import { Actor } from './../../models/actor';
import { Router } from '@angular/router';
import { Query } from '../../models/query'


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private filmService: FilmService,
    private searchService: SearchService,
    private actorService: ActorService,
    private router: Router,
  ) { }

  filmList: Film[];
  actorList: Actor[];
  isLoading: boolean = true;

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

  ngOnInit() {
    this.getFilms();
    this.getActors();
    this.searchService.getQuery().subscribe((query: Query) => {
      this.router.navigate(["/movie"]);
    })
  }

}
