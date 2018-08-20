import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FilmService } from '../../service/film.service';
import { Film } from '../../models/film'

@Component({
  selector: 'app-film-id',
  templateUrl: './film-id.component.html',
  styleUrls: ['./film-id.component.css']
})
export class FilmIdComponent implements OnInit {

  constructor(
    private filmService: FilmService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  id: number;
  film: Film;

  ngOnInit() {
    this.route.paramMap.subscribe(res => {
      this.id = +res.get("id");
      this.filmService.getFilmById(this.id)
        .subscribe((data: Film) => {
          this.film = data
          console.log(this.film)
        });

    })
  }

}
