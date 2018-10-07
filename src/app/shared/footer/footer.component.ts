import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isUploaded: boolean = true;
  uploaded: Subscription;

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.uploaded = this.utilsService.getIsUploaded()
      .subscribe((data: boolean) => this.isUploaded = data);
  }

  ngOnDestroy() {
    this.uploaded.unsubscribe();
  }

}
