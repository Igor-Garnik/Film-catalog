import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  @Input() item;
  @Output() update = new EventEmitter();
  constructor() { }

  sendQuery(query) {
    this.update.emit(this.query)
  }

  ngOnInit() {
  }

}