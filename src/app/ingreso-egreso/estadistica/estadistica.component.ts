import { Component, OnInit } from '@angular/core';

// import { AppState } from '../../app.reducer';
import * as formIngresoEgreso from './../ingreso-egreso.reducer';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IngresoEgresoModel } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  egresos: number;

  cantidadIngresos: number;
  cantidadEgresos: number;

  public chartLabels = ['Ingresos', 'Egresos'];
  public chartData = [[0, 0]];

  subscription: Subscription = new Subscription();

  constructor(private store: Store<formIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('movimientos')
      .pipe(
        filter(movimientos => movimientos.items.length > 0)
      )
      .subscribe(movimientos => {
        this.contarMovimientos(movimientos.items);
      });
  }

  contarMovimientos(items: IngresoEgresoModel[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cantidadIngresos = 0;
    this.cantidadEgresos = 0;

    items.forEach(item => {
      if (item.tipo === 'Ingreso') {
        this.ingresos += parseInt(item.monto, 10);
        this.cantidadIngresos += 1;
        this.chartData[0][0] = this.ingresos;
      } else if (item.tipo === 'Egreso') {
        this.egresos += parseInt(item.monto, 10);
        this.cantidadEgresos += 1;
        this.chartData[0][1] = this.egresos;
      }
    });
  }
}
