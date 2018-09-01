import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) { }

  links: object[] = [
    { path: '/main', label: 'Main', active: 'button-active', icon: 'home' },
    { path: '/movie', label: 'Movie', active: 'button-active', icon: 'list_alt' },
    { path: '/actors', label: 'Actors', active: 'button-active', icon: 'person_outline' }
  ];

  isShow: boolean = false;
  subscription: Subscription;

  loggedIn() {
    this.subscription = this.authService.isLoggedIn()
      .subscribe(loggedIn => this.isShow = loggedIn ? true : false)
  }

  logOut() {
    this.authService.logout();
  }

  ngOnInit() {
    this.loggedIn()
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
