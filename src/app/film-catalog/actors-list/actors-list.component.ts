import { Component, OnInit, OnDestroy } from '@angular/core';
import { Actor } from './../../models/actor';
import { ActorService } from './../../service/actor.service';
import { SearchService } from '../../service/search.service';
import { UtilsService } from '../../service/utils.service';
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

  query: string;
  actorList: Actor[] = [];
  isUploaded: boolean = true;
  queryResponse: Actor[];
  isErrorMessage: boolean = false;
  subscription: Subscription;
  state: string = 'actors';

  //Загрузить список актеров
  viewActors(): void {
    this.actorService.getPopularActors().subscribe(actors => {
      this.isUploaded = false;
      this.actorList = [...this.actorList, ...actors];
      console.log(actors)
    });
  }

  //Добавление страницы
  addPage(): void {
    this.viewActors();
  }

  viewQuery() {
    this.searchService.getQuery().subscribe((query: string) => {
      this.query = query;
      this.subscription = this.actorService.getQueryActor(query).subscribe(data => {
        this.queryResponse = data;
        this.isErrorMessage = this.utilsService.checkErrroMessage(this.queryResponse)
      });
    })
  }

  ngOnInit() {
    this.viewActors();
    this.searchService.setState(this.state);
    this.viewQuery();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
