import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { Query } from '../../models/query';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: Query;
  url;

  constructor(
    private searchService: SearchService,
  ) { }

  setQuery(query): void {
    if (query.length < 3) return;
    this.searchService.setQuery(query);
  }

  clearQuery() {
    this.query = null;
    this.searchService.setQuery(this.query);
  }

  ngOnInit() {
  }

}