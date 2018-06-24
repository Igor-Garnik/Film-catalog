import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Identifiers } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl: string = "https://api.themoviedb.org/3"
  apiKey: string = 'df219c5486f4e7b2218cb6ee83ed1723'
  movieUrl: string = `${this.apiUrl}/movie`
  searchUrl: string = `${this.apiUrl}/search`
  personUrl: string = `${this.apiUrl}/person`
  params: string = `api_key=${this.apiKey}&language=ru-RU&`

  imgPath: string = 'https://image.tmdb.org/t/p'
  midImgPath: string = `${this.imgPath}/w500`
  smallImgPath: string = `${this.imgPath}/w185`
  bigBackPath: string = `${this.imgPath}/w1280`
  midBackPath: string = `${this.imgPath}/w780`
  smallBackPath: string = `${this.imgPath}/w300`

  constructor(
    private http: HttpClient
  ) { }
}
