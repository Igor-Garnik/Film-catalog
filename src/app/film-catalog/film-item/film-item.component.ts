import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CutDescriptionPipe } from './../../shared/pipes/cut-description.pipe';
import { TransformPathPipe } from './../../shared/pipes/transform-path.pipe'


@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css'],
})
export class FilmItemComponent implements OnInit {
  @Input() film;
  @Output() favorite = new EventEmitter<number>();
  @Output() bookmark = new EventEmitter<number>()

  isBookmark: boolean = false;
  isFavorite: boolean = false;

  constructor() { }

  addFavorite() {
    this.isFavorite = !this.isFavorite;
    this.favorite.emit(this.film.id);
  }

  addBookmark() {
    this.isBookmark = !this.isBookmark;
    this.bookmark.emit(this.film.id);
  }

  ngOnInit() {
  }

}
