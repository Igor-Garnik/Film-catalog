import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Actor } from '../shared/actor';
import { ActorService } from '../shared/actor.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit, OnDestroy {

  constructor(
    private actorService: ActorService,
    private utilsService: UtilsService
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

  toggleActorView() {
    this.filmId == undefined
      ? this.viewActors() : this.viewCredits();
  }

  viewCredits(): void {
    this.actorService.loadCrew(this.filmId)
      .subscribe((crew: Array<any>) => {
        this.utilsService.setIsUploaded(this.isUploaded = false);
        this.actorList = [...this.actorList, ...crew[0]];
      })
  }

  //Загрузить список актеров
  viewActors(): void {
    this.actorService.loadPopularActors().subscribe(actors => {
      this.utilsService.setIsUploaded(this.isUploaded = false);
      this.actorList = [...this.actorList, ...actors];
    });
  }

  //Добавление страницы
  addPage(): void {
    this.toggleActorView();
  }

  viewQuery() {
    this.utilsService.getQuery()
      .subscribe((query: string) => {
        this.query = query;
        this.subscription = this.actorService.loadQueryActor(query)
          .subscribe(data => {
            this.queryResponse = data;

          });
      })
  }

  ngOnInit() {
    this.toggleActorView();
    this.utilsService.setState(this.state);
    this.viewQuery();
    this.utilsService.setIsUploaded(this.isUploaded);
    this.utilsService.scrorollToTop();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
