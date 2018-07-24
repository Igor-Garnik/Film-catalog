import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  links: object[] = [
    { path: '/main', label: 'Главная', active: 'button-active', icon: 'home' },
    { path: '/films', label: 'Фильмы', active: 'button-active', icon: 'list_alt' },
    { path: '/actors', label: 'Актеры', active: 'button-active', icon: 'person_outline' }
  ];

}
