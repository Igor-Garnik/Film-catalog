import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  findExactOccurrence(list, query: string, title): any {
    return list.filter(item => {
      return item[title].toLowerCase().substring(0, query.length).includes(query.toLowerCase().trim())
    })
  }

  checkErrroMessage(message) {
    return message.length == 0 ? true : false;
  }
}


