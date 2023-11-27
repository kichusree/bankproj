import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(transactionsArray:any[],searchTerm:string,searchType:string): any[] {
    const result:any=[]
    if(!transactionsArray || searchTerm==''|| searchType=='')
    {
      return transactionsArray
    }
    else{
      transactionsArray.forEach(item=>{
        if(item[searchType].includes(searchTerm)){
          result.push(item)
        }
      })
    }
    return result
  }

}
