import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmItemComponent } from './films-list/film-item/film-item.component';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule
  ],
  declarations: [
    MainComponent, 
    DetailsComponent, 
    FilmItemComponent, 
    FilmsListComponent
  ]
})
export class FilmCatalogModule { }
