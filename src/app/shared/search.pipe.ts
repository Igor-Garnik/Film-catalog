import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: any, value: string, res: string): any {
    if(value === undefined || value.length < 3) return list;
    return list.filter(item => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    })
  }
}
