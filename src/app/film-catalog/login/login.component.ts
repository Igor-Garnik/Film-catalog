import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  credentials = { username: '', password: '' };

  login(): void {
    this.authService.logIn(this.credentials.username, this.credentials.password)
      .subscribe(() => this.router.navigate(["/main"]));
  }

  isLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/movie"]);
    }
  }
  ngOnInit() {
    this.isLoggedIn()
  }

}
