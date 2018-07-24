import { Component, OnInit } from '@angular/core';
import { Actor } from './../../models/actor';
import { ActorService } from './../../service/actor.service';
import { SearchService } from './../../service/search.searvice';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit {

  constructor(public actorService: ActorService, public searchService: SearchService) { }

  query: string = '';
  actorList: Actor[] = [];
  isUploaded: boolean = true;
  queryResponse: Actor[];

  //Загрузить список актеров
  viewActors(): void {
    this.actorService.getPopularActors().subscribe(actors => {
      this.isUploaded = false;
      this.actorList = [...this.actorList, ...actors];
      console.log(this.actorList)
    });
  }

  //Добавление страницы
  addPage(): void {
    this.viewActors();
  }

  //Поиск по названию фильма и имени актера
  searchQuery(data: string): void {
    this.query = data;
    if (this.query.length < 3) return;
    this.searchService.getQueryActor(this.query).subscribe(data => {
      this.queryResponse = data;
    });
  }

  ngOnInit() {
    this.viewActors();
  }

}
