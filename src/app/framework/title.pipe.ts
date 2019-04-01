import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split('_')
      .join(' ')
      .replace('.jpg', '')
      .replace('.svg', '')
      .replace('.png', '');
  }
}
