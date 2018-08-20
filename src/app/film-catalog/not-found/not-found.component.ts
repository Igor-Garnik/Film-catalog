import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  sec: number = 5;

  setCounter() {
    setInterval(() => {
      this.sec -= 1;
      if (this.sec == 0) { this.router.navigate(["/login"]) };
    }, 1000);
  }

  ngOnInit() {
    this.setCounter()
  }

}
