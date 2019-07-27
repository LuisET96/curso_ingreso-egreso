import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { IngresoEgresoService } from '../ingreso-egreso.service';
import { IngresoEgresoModel } from '../ingreso-egreso.model';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: any[];
  itemsSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private movimientos: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.itemsSubscription = this.store.select('movimientos')
      .pipe(
        filter(movimientos => movimientos.items.length > 0)
      )
      .subscribe(movimientos => this.items = movimientos.items);
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  borrarItem(item: IngresoEgresoModel) {
    this.movimientos.borrarIE(item)
      .then(res => {
        Swal.fire('Eliminado', item.descripcion, 'success');
      });
  }
}
