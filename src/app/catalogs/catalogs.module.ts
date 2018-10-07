import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { ActorIdComponent } from './actors-catalog/actor-id/actor-id.component';
import { ActorItemComponent } from './actors-catalog/actor-item/actor-item.component';
import { ActorsListComponent } from './actors-catalog/actors-list/actors-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { FilmItemComponent } from './films-catalog/film-item/film-item.component';
import { FilmsListComponent } from './films-catalog/films-list/films-list.component';
import { FilmIdComponent } from './films-catalog/film-id/film-id.component';
import { MyListsComponent } from './films-catalog/my-lists/my-lists.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AppRoutingModule
  ],
  declarations: [
    ActorIdComponent,
    ActorItemComponent,
    ActorsListComponent,
    FilmItemComponent,
    FilmsListComponent,
    FilmIdComponent,
    MyListsComponent
  ],
  exports: [
    ActorIdComponent,
    ActorItemComponent,
    ActorsListComponent,
    FilmItemComponent,
    FilmsListComponent,
    FilmIdComponent,
    MyListsComponent
  ]
})
export class CatalogsModule { }
