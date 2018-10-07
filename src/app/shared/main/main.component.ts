import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmApiService } from '../../catalogs/films-catalog/shared/film-API.service';
import { Film } from '../../catalogs/films-catalog/shared/film';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(
    private filmApiService: FilmApiService,
    private router: Router,
    private utilsService: UtilsService
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
    this.subscription = this.utilsService.getQuery().subscribe(() => {
      this.router.navigate(["/movie"]);
    })
  }

  loadLists() {
    this.filmApiService.getLocalStorage();
    return forkJoin(
      this.filmApiService.loadMainList(this.page, 'now_playing'),
      this.filmApiService.loadMainList(this.page, 'popular'),
      this.filmApiService.loadMainList(this.page, 'top_rated')
    )
      .subscribe((data: Array<any>) => {
        this.utilsService.setIsUploaded(this.isUploaded = false);
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
    this.utilsService.setState(this.state);
    this.redirect();
    this.utilsService.setIsUploaded(this.isUploaded);
    this.utilsService.scrorollToTop();
  }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : null;
  }

}
