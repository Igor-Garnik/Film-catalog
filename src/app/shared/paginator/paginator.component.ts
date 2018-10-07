import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  pageEvent: PageEvent;


  constructor(private utilsService: UtilsService) { }

  @Input() totalFilmsResults;
  @Output() pagination = new EventEmitter<number>();

  pageSize = 20;
  pageSizeOptions: number[] = [20];

  doPagination() {
    this.pagination.emit(this.pageEvent.pageIndex + 1); //+1 применяется для корретной нумерации страници в компоненте
    this.utilsService.scrorollToTop();
  }

  ngOnInit() {
  }

}
