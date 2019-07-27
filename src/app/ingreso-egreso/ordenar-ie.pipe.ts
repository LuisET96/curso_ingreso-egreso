import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenarIE'
})
export class OrdenarIePipe implements PipeTransform {
  transform(items: IngresoEgresoModel[] = []): IngresoEgresoModel[] {
    return items.sort((item, nextItem) => {
      return item.tipo === 'Ingreso' ? -1 : 1;
    });
  }
}
