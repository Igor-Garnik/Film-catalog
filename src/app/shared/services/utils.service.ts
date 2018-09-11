import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private route: ActivatedRoute) { }

  findExactOccurrence(list, query: string, title): any {
    return list.filter(item => {
      return item[title].toLowerCase().substring(0, query.length).includes(query.toLowerCase().trim())
    })
  }

  checkErrroMessage(message) {
    return message.length == 0 ? true : false;
  }

  setImage(path: string, apiData: string): string {
    return `${path}${apiData}`;
  }

  getUrlParams(): any {
    let res = this.route.snapshot.url.map(url => url.path)
    console.log(res)
  }

  includePram(params) {
    return params.includes('view');
  }
}


