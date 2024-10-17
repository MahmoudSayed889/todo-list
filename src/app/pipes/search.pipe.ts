import { Pipe, PipeTransform } from '@angular/core';
import { Itask } from '../interfaces/itask';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allTasks:Itask[], searchTerm:string): Itask[] {


    return allTasks.filter( (task) => task.taskName.toLocaleLowerCase().includes( searchTerm.toLocaleLowerCase() ) );
  }

}
