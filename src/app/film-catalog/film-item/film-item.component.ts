import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Tooltip } from '../../shared/models/tooltip'

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css'],
})
export class FilmItemComponent implements OnInit {
  @Input() film;
  @Output() favorite = new EventEmitter<number>();
  @Output() list = new EventEmitter<any>()

  constructor(private router: Router) { }

  favoriteTooltip: string;
  watchListTooltip: string;
  favoriteConf = {
    message: '',
    add: 'Add to favotites',
    remove: 'Remove from favorites'
  }
  watchListConf = {
    message: '',
    add: 'Add to watchlist',
    remove: 'Remove from watchlist'
  }


  addToFavorite() {
    this.film.isFavorite = !this.film.isFavorite;
    this.setTooltip(this.favoriteConf, this.film.isFavorite);
    this.favorite.emit(this.film);
  }

  addToWatchList() {
    this.film.isWatchList = !this.film.isWatchList;
    this.setTooltip(this.watchListConf, this.film.isFavorite);
    this.list.emit(this.film);
  }

  setTooltip(config: Tooltip, isChecked: boolean) {
    config.message = isChecked ? config.remove : config.add;
  }

  ngOnInit() {
    this.setTooltip(this.favoriteConf, this.film.isFavorite);
    this.setTooltip(this.watchListConf, this.film.isWatchList);
  }

}
