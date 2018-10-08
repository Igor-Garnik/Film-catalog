import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css']
})
export class MyListsComponent implements OnInit {

  constructor(private utilsService: UtilsService) { }

  isUploaded: boolean = true;

  click() {
    this.utilsService.setIsUploaded(this.isUploaded);
  }

  ngOnInit() {
    this.click();
  }

}
