import { Component, OnInit } from '@angular/core';
import { ListenerDownloadsService } from '../shared/services/listenerDownloads.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isUploaded: boolean;
  uploaded: Subscription;

  constructor(private listenerDownloadsService: ListenerDownloadsService) { }

  ngOnInit() {
    this.uploaded = this.listenerDownloadsService.getIsUploaded()
      .subscribe((data: boolean) => {
        this.isUploaded = data
        console.log(data)
      })
  }

  ngOnDestroy() {
    this.uploaded.unsubscribe();
  }

}
