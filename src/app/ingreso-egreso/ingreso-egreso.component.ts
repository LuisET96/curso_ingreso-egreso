import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
// import { AppState } from '../app.reducer';
import * as formIngresoEgreso from './ingreso-egreso.reducer';

import * as fromUI from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  formIE: FormGroup;
  tipo = 'Ingreso';

  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    private movimientos: IngresoEgresoService,
    private store: Store<formIngresoEgreso.AppState>
  ) { }

  ngOnInit() {
    this.loadingSubs = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);

    this.formIE = new FormGroup({
      descripcion: new FormControl('', [
        Validators.required,
        Validators.maxLength(200)
      ]),
      monto: new FormControl(0, Validators.min(1))
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  onSubmitIE() {
    this.store.dispatch(fromUI.activarLoadingAction());

    const { descripcion, monto } = this.formIE.value;
    const ingresoEgreso: IngresoEgresoModel = new IngresoEgresoModel(
      descripcion,
      monto,
      this.tipo
    );

    this.movimientos.crearIE(ingresoEgreso)
      .then(res => {
        Swal.fire('Creado', ingresoEgreso.descripcion, 'success');

        this.formIE.reset({ monto: 0 });
        this.store.dispatch(fromUI.desactivarLoadingAction());
      })
      .catch(err => {
        this.store.dispatch(fromUI.desactivarLoadingAction());
        throw new Error('err');
      });
  }
}
