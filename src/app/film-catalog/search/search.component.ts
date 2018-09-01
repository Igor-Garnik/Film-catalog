import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { Subscription, fromEvent } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { debounceTime, pluck } from 'rxjs/operators';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild("input") input;
  query: string;
  url: string;
  subscriptionState: Subscription;
  subscriptionLog: Subscription;
  isLoggedIn;

  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) { }

  clearQuery() {
    this.searchService.setQuery(this.query);

  }

  setInput(url) {
    this.url = url == 'actors' ? 'person' : 'movie'
  }

  getState() {
    this.subscriptionState = this.searchService.getState()
      .subscribe(url => {
        this.setInput(url);
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
      .subscribe((query: string) => this.searchService.setQuery(query))
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