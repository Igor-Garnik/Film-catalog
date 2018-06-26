import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutRating'
})
export class CutRatingPipe implements PipeTransform {

  transform(reting: number,): any {
    return (reting === undefined) ? 
    'нет данных для отображения' : Math.round(reting * 10) / 10;
  }
}
