import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CutDescriptionPipe } from './../../shared/pipes/cut-description.pipe';
import { TransformPathPipe} from './../../shared/pipes/transform-path.pipe'


@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css'],
})
export class FilmItemComponent implements OnInit {
  @Input() film;
  @Output() makeFavorite = new EventEmitter<number>();
  @Output() makeBookmark = new EventEmitter<number>()

  isBookmark:boolean = false;
  isFavorite:boolean = false;
  status:boolean = false;

  constructor() { }

  addFavorite() {
    this.isFavorite = !this.isFavorite;
    this.makeFavorite.emit(this.film.id);
  }

  addBookmars(){
    this.isBookmark = !this.isBookmark;
    this.makeBookmark.emit(this.film.id);
  }
  
  ngOnInit() {
  }

}
