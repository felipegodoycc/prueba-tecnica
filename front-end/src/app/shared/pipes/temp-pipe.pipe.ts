import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempPipe'
})
export class TempPipePipe implements PipeTransform {

  transform(value: number, unit: string) {

    if(value && !isNaN(value)){

           if(unit === 'C'){
             var temp = (value - 32) / 1.8 ;
             return temp.toFixed(2);
           }
           if(unit === 'F'){
            var temp = (value * 32) + 1.8 ;
            return temp.toFixed(2);
          }
    }
return;
}

}
