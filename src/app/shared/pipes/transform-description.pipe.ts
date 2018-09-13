import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'transformDescription'
})
export class TransformDescriptionPipe implements PipeTransform {

  transform(description: string, number: number): string {
    if (description === '') return 'Нет данных для отображения...';
    if (description.length > number) {
      return description.slice(0, description.indexOf(' ', number)) + `...`;
    } else {
      return description;
    }
  }

}
