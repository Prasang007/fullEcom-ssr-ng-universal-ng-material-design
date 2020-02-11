import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform( values?: object[], filterVal?: string, filterFor?: string): object[] {
    const filteredArray: object[] = [];
    console.log(filterVal);
    values.forEach((value: object) => {
      if (value[filterFor].toLowerCase()
      .match(
        filterVal.toLowerCase()
        )) {
       filteredArray.push(value);
       console.log(filteredArray);
        }
    });
    return filteredArray;
  }
}
