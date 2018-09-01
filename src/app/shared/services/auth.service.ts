import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../configs/api.config';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { retry, tap, map, mergeMap } from 'rxjs/operators';
import { Config } from 'protractor';
import { Request } from '../models/request'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://reqres.in/api';
  //private loggedIn: boolean = false;
  loggedIn$ = new BehaviorSubject(false);
  userId$ = new Subject<string>();
  sessionId$ = new Subject<string>();

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) public apiConfig: Config
  ) {
    this.loggedIn$.next(!!localStorage.getItem('session_id'))
  }

  isLoggedIn() {
    return this.loggedIn$.asObservable();
  }

  logIn(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiConfig.authUrl}/authentication/token/new?${this.apiConfig.apiKey}`)
      .pipe(
        mergeMap((res: Request) =>
          this.http.get(`${this.apiConfig.authUrl}/authentication/token/validate_with_login?username=${username}&password=${password}&request_token=${res.request_token}&${this.apiConfig.apiKey}`)
        ),
        mergeMap((res: Request) =>
          this.http.get(`${this.apiConfig.authUrl}/authentication/session/new?${this.apiConfig.apiKey}&request_token=${res.request_token}`)
        ),
        tap((res: Request) => {
          if (res.session_id) {
            localStorage.setItem('session_id', res.session_id);
            this.loggedIn$.next(true);
          }
        }),
        mergeMap((res: Request) =>
          this.http.get(`${this.apiConfig.authUrl}/account?${this.apiConfig.apiKey}&session_id=${res.session_id}`)
        ),
        tap((res: Request) => {
          localStorage.setItem('user_id', res.id);
        }),
      );
  }

  logout() {
    localStorage.removeItem('user_id')
    localStorage.removeItem('session_id');
    this.loggedIn$.next(false);
  }
}


