import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
    private route: ActivatedRoute
  ) { }

  id: number;
  film: Film;

  showFilm() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get("id");
      this.filmService.getFilmById(this.id)
        .subscribe((data: Film) => {
          this.film = data
        });
    })
  }


  ngOnInit() {
    this.showFilm()
  }

}
