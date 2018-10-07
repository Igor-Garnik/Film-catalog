import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { debounceTime, pluck } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UtilsService } from '../services/utils.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild("input") input: any;
  @ViewChild("form") form: any;
  url: string;
  query: string;
  urlParam: string;
  queryType: string;
  subscriptionState: Subscription;
  subscriptionLog: Subscription;
  isLoggedIn;

  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private router: Router,
  ) { }

  reset() {
    this.query = '';
    this.router.navigate(['main']); //переход на родительскую страницу
  }

  setInputType(url) {
    this.queryType = url == 'actors' ? 'актерам' : 'фильмам'
  }

  setUrlParam(param): void {
    this.urlParam = param == 'films' || param == 'main' ? 'film' : 'actor';
  }

  getState() {
    this.subscriptionState = this.utilsService.getState()
      .subscribe(param => {
        this.url = param;
        this.setUrlParam(param);
        this.setInputType(param);
      })
  }

  isLogin() {
    this.subscriptionLog = this.authService.isLoggedIn()
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      pluck('target', 'value'),
      debounceTime(1000),
    )
      .subscribe((query: string) => {
        this.utilsService.setQuery(query);
        this.router.navigate([`search/${this.urlParam}/${this.query}`])
      })
  }

  ngOnInit() {
    this.getState();
    this.isLogin();
  }

  ngOnDestroy() {
    if (this.subscriptionState) {
      this.subscriptionState.unsubscribe();
    }
    if (this.subscriptionLog) {
      this.subscriptionLog.unsubscribe();
    }
  }

}