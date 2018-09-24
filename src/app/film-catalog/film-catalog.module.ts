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
import { MyFilmsComponent } from './my-films/my-films.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { NgxPaginationModule } from 'ngx-pagination'


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AppRoutingModule,
    Ng2CarouselamosModule,
    NgxPaginationModule

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
    ActorIdComponent,
    MyFilmsComponent,
  ]
})
export class FilmCatalogModule { }
