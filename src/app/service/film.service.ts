import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Identifiers } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/data.service'

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient, public dataService: DataService) { }

  getFilm (page: number) {
    return this.http.get(`${this.dataService.movieUrl}/popular?${this.dataService.params}page=${page}`); 
  }
}
