import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root'
})
export class SerchService {

  constructor(private http: HttpClient, public dataService: DataService) { 

  }
  /* getQuery(query:string, ){
    return this.http.get(`${this.dataService.movieUrl}/popular?${this.dataService.params}page=${page}`)
  } */
}
