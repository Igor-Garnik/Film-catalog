import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tooltip } from '../../shared/models/tooltip'
import { FilmService } from '../../shared/services/film.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css'],
})
export class FilmItemComponent implements OnInit {
  @Input() film;
  @Input() cardView;
  @Output() favorite = new EventEmitter<number>();
  @Output() list = new EventEmitter<any>()

  constructor(private filmService: FilmService) { }

  favoriteTooltip: string;
  watchListTooltip: string;
  subscription: Subscription;
  favoriteConf = {
    message: '',
    add: 'Добавить в избранный',
    remove: 'Удалить из избранных'
  }
  watchListConf = {
    message: '',
    add: 'Добавить к просмотру',
    remove: 'Удалить из просмотра'
  }

  //Добвление в избранные
  addToFavorite() {
    this.film.isFavorite = !this.film.isFavorite;
    this.setTooltip(this.favoriteConf, this.film.isFavorite);
    this.favorite.emit(this.film);
  }

  //Добавление в список
  addToWatchList() {
    this.film.isWatchList = !this.film.isWatchList;
    this.setTooltip(this.watchListConf, this.film.isFavorite);
    this.list.emit(this.film);
  }

  //Определение подсказки, "добавить или удалить"
  setTooltip(config: Tooltip, isChecked: boolean) {
    config.message = isChecked ? config.remove : config.add;
  }

  ngOnInit() {
    this.setTooltip(this.favoriteConf, this.film.isFavorite);
    this.setTooltip(this.watchListConf, this.film.isWatchList);
  }

}
