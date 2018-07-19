import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { MessageService } from  './../../service/message.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query:string = '';
  @Input() item;
  @Output() update = new EventEmitter();
  constructor(public messageService : MessageService) { }

  sendQuery(query) {
    this.update.emit(this.query)
  }

/*   sendQuery(query) {
    this.messageService.sendMessage(query);
  } */

  clearMessage(): void {
    this.messageService.clearMessage();
  }
  ngOnInit() {
  }

}
