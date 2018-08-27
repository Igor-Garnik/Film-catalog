import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://reqres.in/api';
  //private loggedIn: boolean = false;
  loggedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.loggedIn$.next(!!localStorage.getItem('auth_token'))
  }

  isLoggedIn() {
    return this.loggedIn$.asObservable();
  }

  logIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, { username, password })
      .pipe(
        retry(2),
        tap(res => {
          if (res.token) {
            localStorage.setItem('auth_token', res.token);
            this.loggedIn$.next(true);
          }
        }),
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn$.next(false);
  }

}
