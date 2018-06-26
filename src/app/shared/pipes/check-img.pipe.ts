import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkImg'
})
export class CheckImgPipe implements PipeTransform {

  transform(data: any): any {
    return (data !== null) ?
      data : "../assets/img/img_not_found.png";
  }

}
