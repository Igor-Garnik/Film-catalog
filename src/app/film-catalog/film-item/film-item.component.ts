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

  cutDescription(description) {
    if (description.length > 200) {
      return description.slice(0, description.indexOf(' ', 200)) + `...`;
    }
    return description;
  }
  
  ngOnInit() {
  }

}
