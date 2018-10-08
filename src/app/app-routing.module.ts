import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './shared/main/main.component';
import { FilmsListComponent } from './catalogs/films-catalog/films-list/films-list.component';
import { ActorsListComponent } from './catalogs/actors-catalog/actors-list/actors-list.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { NotFoundComponent } from './shared/not-found/not-found.component'
import { FilmIdComponent } from './catalogs/films-catalog/film-id/film-id.component';
import { ActorIdComponent } from './catalogs/actors-catalog/actor-id/actor-id.component';
import { MyListsComponent } from './catalogs/films-catalog/my-lists/my-lists.component'
import { ViewQueryComponent } from './shared/view-query/view-query.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "main", component: MainComponent, canActivate: [AuthGuard] },
  { path: "movie/:list-type", component: FilmsListComponent, canActivate: [AuthGuard] },
  { path: "movie/:id/view", component: FilmIdComponent, canActivate: [AuthGuard] },
  { path: "movie/my-lists/:list-type", component: MyListsComponent, canActivate: [AuthGuard] },

  { path: "actors", component: ActorsListComponent, canActivate: [AuthGuard] },
  { path: "actors/:id/view", component: ActorIdComponent, canActivate: [AuthGuard] },
  { path: "search/:type/:name", component: ViewQueryComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
