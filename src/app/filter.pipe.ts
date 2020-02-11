import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform( values?: object[], filterVal?: string, filterFor?: string): object[] {
    const filteredArray: object[] = [];
    values.forEach((value: object) => {
      if (value[filterFor].toLowerCase()
      .match(
        filterVal.toLowerCase()
        )) {
       filteredArray.push(value);
        }
    });
    return filteredArray;
  }
}
