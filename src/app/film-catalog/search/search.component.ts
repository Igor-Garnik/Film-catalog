<<<<<<< HEAD
<<<<<<< HEAD
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

=======
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { MessageService } from  './../../service/message.service'
>>>>>>> d6714bd911b996e21fc7df85a7a442e4ae31a362
=======
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

>>>>>>> dev

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
<<<<<<< HEAD
<<<<<<< HEAD
  query: string = '';
  @Input() item;
  @Output() update = new EventEmitter();
  constructor() { }
=======
  query:string = '';
  @Input() item;
  @Output() update = new EventEmitter();
  constructor(public messageService : MessageService) { }
>>>>>>> d6714bd911b996e21fc7df85a7a442e4ae31a362
=======
  query: string = '';
  @Input() item;
  @Output() update = new EventEmitter();
  constructor() { }
>>>>>>> dev

  sendQuery(query) {
    this.update.emit(this.query)
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
/*   sendQuery(query) {
    this.messageService.sendMessage(query);
  } */

  clearMessage(): void {
    this.messageService.clearMessage();
  }
>>>>>>> d6714bd911b996e21fc7df85a7a442e4ae31a362
=======
>>>>>>> dev
  ngOnInit() {
  }

}
