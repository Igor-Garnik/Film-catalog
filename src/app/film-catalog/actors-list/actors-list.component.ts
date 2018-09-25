import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Actor } from './../../shared/models/actor';
import { ActorService } from './../../shared/services/actor.service';
import { SearchService } from '../../shared/services/search.service';
import { UtilsService } from '../../shared/services/utils.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit, OnDestroy {

  constructor(
    private actorService: ActorService,
    private searchService: SearchService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) { }

  @Input() filmId;

  query: string;
  actorList: Actor[] = [];
  isUploaded: boolean = true;
  queryResponse: Actor[];
  isErrorMessage: boolean = false;
  subscription: Subscription;
  state: string = 'actors';
  gagList: Array<string> = [];


  fillGag(): void {
    let space: string = '';
    for (let i = 0; i < 15; i++) {
      this.gagList.push(space);
    }
  }

  toggleActorView() {
    this.filmId == undefined
      ? this.viewActors() : this.viewCredits();
  }

  viewCredits(): void {
    this.actorService.loadCrew(this.filmId)
      .subscribe((crew: Array<any>) =>
        this.actorList = [...this.actorList, ...crew[0]])
  }

  //Загрузить список актеров
  viewActors(): void {
    this.actorService.loadPopularActors().subscribe(actors => {
      this.isUploaded = false;
      this.actorList = [...this.actorList, ...actors];
    });
  }

  //Добавление страницы
  addPage(): void {
    this.toggleActorView();
  }

  viewQuery() {
    this.searchService.getQuery()
      .subscribe((query: string) => {
        this.query = query;
        this.subscription = this.actorService.loadQueryActor(query)
          .subscribe(data => {
            this.queryResponse = data;
            this.isErrorMessage = this.utilsService.checkErrroMessage(this.queryResponse)
          });
      })
  }

  ngOnInit() {
    this.toggleActorView();
    this.searchService.setState(this.state);
    this.viewQuery();
    this.fillGag();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
