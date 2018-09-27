import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from '../../shared/services/film.service';
import { SearchService } from '../../shared/services/search.service';
import { Film } from './../../shared/models/film';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { ListenerDownloadsService } from '../../shared/services/listenerDownloads.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(
    private filmService: FilmService,
    private searchService: SearchService,
    private router: Router,
    private listenerDownloadsService: ListenerDownloadsService
  ) { }

  firstBlockFirst: Film;
  firstBlockSecond: Film;
  firstBlockThird: Film;
  secondBlockFirst: Film;
  secondBlockSecond: Film;
  secondBlockThird: Film;
  isUploaded: boolean = true;
  state: string = 'main';
  subscription: Subscription;
  page: number = 1;
  listIds: Array<number> = [1, 3945, 932, 1131];
  filmsList: Array<Film> = [];
  res: Array<string> = [];

  redirect() {
    this.subscription = this.searchService.getQuery().subscribe(() => {
      this.router.navigate(["/movie"]);
    })
  }

  loadLists() {
    this.filmService.getLocalStorage();
    return forkJoin(
      this.filmService.loadFilms(this.page, 'now_playing'),
      this.filmService.loadFilms(this.page, 'popular'),
      this.filmService.loadFilms(this.page, 'top_rated')
    )
      .subscribe((data: Array<Array<Film>>) => {
        this.listenerDownloadsService.setIsUploaded(this.isUploaded = false);
        this.saveData(data)
      });
  }

  saveData(data: Array<Array<Film>>): void {
    this.filmsList = data[0];
    [this.firstBlockFirst, this.firstBlockSecond, this.firstBlockThird] = data[1].splice(0, 3);
    [this.secondBlockFirst, this.secondBlockSecond, this.secondBlockThird] = data[2].splice(0, 3);
  }

  ngOnInit() {
    this.loadLists();
    this.searchService.setState(this.state);
    this.redirect();
    this.listenerDownloadsService.setIsUploaded(this.isUploaded);
  }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : null;
  }

}
