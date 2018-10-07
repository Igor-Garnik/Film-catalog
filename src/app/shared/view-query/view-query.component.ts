import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FilmApiService } from '../../catalogs/films-catalog/shared/film-API.service';
import { UtilsService } from '../services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-query',
  templateUrl: './view-query.component.html',
  styleUrls: ['./view-query.component.css']
})
export class ViewQueryComponent implements OnInit, OnDestroy {

  constructor(
    private filmApiService: FilmApiService,
    private utilsService: UtilsService,
  ) { }

  isUploaded: boolean;
  queryResponse: any;
  isErrorMessage: boolean;
  totalFilmsResults: number = 100;
  query: Subscription;
  test = 'test';


  //Получить список фильмов согласно поиска
  viewQuery(query): void {
    this.queryResponse = this.filmApiService.getQueryFilm(query)
  }

  getQuery(): void {
    this.query = this.utilsService.getQuery()
      .subscribe(query => this.viewQuery(query))
  }

  ngOnInit() {
    this.getQuery();
  }

  ngOnDestroy() {
    //this.query.unsubscribe();
  }

}
