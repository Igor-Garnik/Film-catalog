import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutDescription'
})
export class CutDescriptionPipe implements PipeTransform {

  transform(description: string): string {
    if(description === undefined) return description;
    if (description.length > 200) {
      return description.slice(0, description.indexOf(' ', 200)) + `...`;
    } else {
      return description;
    }
  }

}
