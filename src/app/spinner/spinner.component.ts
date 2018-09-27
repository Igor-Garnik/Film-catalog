import { Component, OnInit } from '@angular/core';
import { ListenerDownloadsService } from '../shared/services/listenerDownloads.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(private listenerDownloadsService: ListenerDownloadsService) { }

  isUploaded: boolean;

  ngOnInit() {
    this.listenerDownloadsService.getIsUploaded()
      .subscribe((status: boolean) => this.isUploaded = status);
  }

}
