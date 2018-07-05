import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformPath'
})

export class TransformPathPipe implements PipeTransform {

  transform(data: string, size:number): string {
    return (data !== null) ?    
    `https://image.tmdb.org/t/p/w${size}${data}`  : "../assets/img/img_not_found.png";
  }
}
