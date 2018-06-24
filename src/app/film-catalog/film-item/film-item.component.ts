import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CutDescriptionPipe } from 'src/app/shared/cut-description.pipe';



@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css'],
})
export class FilmItemComponent implements OnInit {
  @Input() film;
  @Output() update = new EventEmitter();

  isFavorite:boolean = false;
  check:string = 'Добавить в избранное';
  unCheck:string = 'Удалить из избранного';

  constructor() { }

  /* setFavorite(isFavorite) {
    isFavorite = !isFavorite;
    this.update.emit(isFavorite);
  } */
  
  ngOnInit() {
  }

}
