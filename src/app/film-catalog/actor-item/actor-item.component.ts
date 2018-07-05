import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Film } from './../../models/film'
import { CutRatingPipe } from './../../shared/pipes/cut-rating.pipe';

@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.css']
})
export class ActorItemComponent implements OnInit {

  list:any;
  query:string = '';

  constructor() { }
  @Input() actor;

  ngOnInit() {
  }
}
