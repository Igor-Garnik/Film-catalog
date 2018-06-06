import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FilmsComponent } from './films/films.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { FilmItemComponent } from './film-item/film-item.component';
import { FilmsListComponent } from './films-list/films-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule
  ],
  declarations: [
    MainComponent, 
    FilmsComponent, 
    DetailsComponent, FilmItemComponent, FilmsListComponent
  ]
})
export class FilmCatalogModule { }
