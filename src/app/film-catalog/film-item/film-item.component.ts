import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input('item') film;
  @Output() update = new EventEmitter();

  check:string = 'Добавить в избранное';
  unCheck:string = 'Удалить из избранного';

  constructor() { }

  setFavorite(isFavorite) {
    isFavorite = !isFavorite;
    this.update.emit(isFavorite);
  }

  /* cutDiscription(description) {
    let sliced = description.slice(0,150);
    if (sliced.length <description.length) {
      return sliced += '...';
    }
  } */

  cutDescription(description) {
    if (description.length > 200) {
      let res = description.slice(0, 200);
      return description.slice(0, res.lastIndexOf(' ')) + `...`;
    }
    return description;
  }
  
  ngOnInit() {
  }

}
