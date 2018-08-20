import { Component, OnInit } from '@angular/core';
import { Actor } from './../../models/actor';
import { ActorService } from './../../service/actor.service';
import { Query } from '../../models/query';
import { SearchService } from '../../service/search.service';
import { UtilsService } from '../../service/utils.service';


@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit {

  constructor(
    private actorService: ActorService,
    private searchService: SearchService,
    private utilsService: UtilsService
  ) { }

  query: Query;
  actorList: Actor[] = [];
  isUploaded: boolean = true;
  queryResponse: Actor[];
  isErrorMessage: boolean = false;

  //Загрузить список актеров
  viewActors(): void {
    this.actorService.getPopularActors().subscribe(actors => {
      this.isUploaded = false;
      this.actorList = [...this.actorList, ...actors];
    });
  }

  //Добавление страницы
  addPage(): void {
    this.viewActors();
  }

  ngOnInit() {
    this.viewActors();
    this.searchService.getQuery().subscribe((query: Query) => {
      this.query = query;
      this.actorService.getQueryActor(query).subscribe(data => {
        this.queryResponse = data;
        this.isErrorMessage = this.utilsService.checkErrroMessage(this.queryResponse)
      });
    })
  }

}
