import { Component, OnInit } from '@angular/core';
import { FooterService } from '../shared/services/footer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isUploaded: boolean;
  uploaded: Subscription;

  constructor(private footerService: FooterService) { }

  ngOnInit() {
    this.uploaded = this.footerService.getUploaded()
      .subscribe((data: boolean) => {
        this.isUploaded = data
        console.log(data)
      })
  }

  ngOnDestroy() {
    this.uploaded.unsubscribe();
  }

}
