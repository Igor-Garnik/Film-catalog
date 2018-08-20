import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) { }

  links: object[] = [
    { path: '/main', label: 'Главная', active: 'button-active', icon: 'home' },
    { path: '/movie', label: 'Фильмы', active: 'button-active', icon: 'list_alt' },
    { path: '/actors', label: 'Актеры', active: 'button-active', icon: 'person_outline' }
  ];


  get loggedIn() {
    return this.authService.isLoggedIn()
  }

  logOut() {
    this.authService.logout();
  }

}
