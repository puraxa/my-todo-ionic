import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<any>, fieldName: string, fieldValue: any): Array<any> {
    if(!value || value.length < 1){
      return;
    }
    const type = typeof(fieldValue);
    if((type == "boolean" || type == "number") && typeof(value[0][fieldName]) == type){
      return value.filter(item => item[fieldName] === fieldValue);
    }
    if(type == "string" && typeof(value[0][fieldName]) == type){
      return value.filter(item => item[fieldName].toLowerCase().indexOf(fieldValue.toLowerCase())>-1);
    }
  }
}
