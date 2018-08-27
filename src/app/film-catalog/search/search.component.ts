import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  query: string;
  url: string;
  subscriptionState: Subscription;
  subscriptionLog: Subscription;
  isLoggedIn;


  constructor(
    private searchService: SearchService,
    private authService: AuthService
  ) { }

  setQuery(query): void {
    if (query.length < 3) return;
    this.searchService.setQuery(query);
  }

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