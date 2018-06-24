import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-serch',
  templateUrl: './serch.component.html',
  styleUrls: ['./serch.component.css']
})
export class SerchComponent implements OnInit {
  query:string = '';
  @Input() item;
  @Output() update = new EventEmitter();
  constructor() { }

  sendQuery() {
    this.update.emit(this.query)
  }
  ngOnInit() {
  }

}
