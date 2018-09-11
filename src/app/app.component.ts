import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';
import { DetailsService } from './shared/services/details.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private detailsService: DetailsService
  ) { }

  links: object[] = [
    { path: '/main', label: 'Главная', active: 'button-active', icon: 'home' },
    { path: '/movie', label: 'Фильмы', active: 'button-active', icon: 'list_alt' },
    { path: '/actors', label: 'Актеры', active: 'button-active', icon: 'person_outline' }
  ];

  isShow: boolean = false;
  subscription: Subscription;
  userName: string;

  loggedIn() {
    this.subscription = this.authService.isLoggedIn()
      .subscribe(loggedIn => this.isShow = loggedIn ? true : false)
  }

  logOut() {
    this.authService.logout();
  }

  getAccount() {
    let sessionId = localStorage.getItem('session_id');
    this.detailsService.loadAccount(sessionId)
      .subscribe((data: string) => this.userName = data);
  }


  ngOnInit() {
    this.loggedIn()
    this.getAccount();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
