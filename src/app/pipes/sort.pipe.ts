import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<any>, fieldName: string, direction: string): any {
    if(!value){
      return;
    }
    if(direction != 'asc' && direction != 'desc'){
      return;
    }
    for(let i = 0; i < value.length - 1; i++){
      for(let j = 0; j < value.length - i - 1; j++){
        if(direction == 'desc' && value[j][fieldName] < value[j+1][fieldName]){
          this.swap(value, j, j+1);
        }
        if(direction == 'asc' && value[j][fieldName] > value[j+1][fieldName]){
          this.swap(value, j, j+1);
        }
      }
    }
    return value;
  }
  swap = (arr:Array<any>, i:number, j:number):void => {
    const val = arr[i];
    arr[i] = arr[j];
    arr[j] = val;
  }
}
