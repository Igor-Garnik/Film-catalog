import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';



@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input('item') film: {};

  constructor() { }

  ngOnInit() {
  }

}
