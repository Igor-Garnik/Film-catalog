import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './film-catalog/main/main.component';
import { FilmsListComponent } from './film-catalog/films-list/films-list.component';
import { ActorsListComponent } from './film-catalog/actors-list/actors-list.component';
import { LoginComponent } from './film-catalog/login/login.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { NotFoundComponent } from './film-catalog/not-found/not-found.component'
import { FilmIdComponent } from './film-catalog/film-id/film-id.component';
import { ActorIdComponent } from './film-catalog/actor-id/actor-id.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "main", component: MainComponent, canActivate: [AuthGuard] },
  { path: "movie", component: FilmsListComponent, canActivate: [AuthGuard] },
  { path: "movie/:id/view", component: FilmIdComponent, canActivate: [AuthGuard] },
  { path: "actors", component: ActorsListComponent, canActivate: [AuthGuard] },
  { path: "actors/:id/view", component: ActorIdComponent, canActivate: [AuthGuard] },
  //{ path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
