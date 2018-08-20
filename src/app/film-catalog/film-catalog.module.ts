import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { SharedModule } from '../shared/shared.module';
import { ActorItemComponent } from './actor-item/actor-item.component';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { MaterialModule } from '../material.module';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FilmIdComponent } from './film-id/film-id.component';
import { ActorIdComponent } from './actor-id/actor-id.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AppRoutingModule

  ],
  declarations: [
    MainComponent,
    FilmItemComponent,
    FilmsListComponent,
    ActorItemComponent,
    ActorsListComponent,
    LoginComponent,
    NotFoundComponent,
    FilmIdComponent,
    ActorIdComponent
  ]
})
export class FilmCatalogModule { }
