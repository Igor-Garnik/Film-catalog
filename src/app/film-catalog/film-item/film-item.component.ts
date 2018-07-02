import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CutDescriptionPipe } from 'src/app/shared/pipes/cut-description.pipe';



@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css'],
})
export class FilmItemComponent implements OnInit {
  @Input() film;
  @Output() update = new EventEmitter();

  isBookmark:boolean = false;
  isFavorite:boolean = false;
  status:boolean = false;

  constructor() { }

  setToFavorite() {
    this.isFavorite = !this.isFavorite;
    this.update.emit(this.isFavorite);
  }

  setToFolder(e){
    this.isBookmark = !this.isBookmark;
    this.update.emit(this.isBookmark);
  }
  
  ngOnInit() {
  }

}
