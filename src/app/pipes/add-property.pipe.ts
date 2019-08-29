import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addProperty'
})
export class AddPropertyPipe implements PipeTransform {

  transform(objectArray: Array<Object>, propertyName: string, propertyValue: any): Array<Object> {
    const result = objectArray.map(val => {
      val[propertyName] = propertyValue;
      return val;
    });
    return result;
  }

}
