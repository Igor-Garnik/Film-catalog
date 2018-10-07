import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(private utilsService: UtilsService) { }

  isUploaded: boolean;

  ngOnInit() {
    this.utilsService.getIsUploaded()
      .subscribe((status: boolean) => this.isUploaded = status);
  }
}
