import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css'],
})
export class FilmItemComponent implements OnInit {
  @Input() film;
  @Output() favorite = new EventEmitter<number>();
  @Output() bookmark = new EventEmitter<number>()

  constructor(private router: Router) { }

  addFavorite() {
    this.film.isFavorite = !this.film.isFavorite;
    this.favorite.emit(this.film.id);
  }

  addBookmark() {
    this.film.isBookmark = !this.film.isBookmark;
    this.bookmark.emit(this.film.id);
  }

  ngOnInit() {
  }

}
