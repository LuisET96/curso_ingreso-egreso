import { createReducer, on } from '@ngrx/store';
import * as fromMovimientos from './ingreso-egreso.actions';

import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
  items: IngresoEgresoModel[];
}

export interface AppState extends AppState {
  movimientos: IngresoEgresoState;
}

const initState: IngresoEgresoState = {
  items: []
};

export const ingresoEgresoReducer = createReducer(initState,
  on(fromMovimientos.setItemsAction, (state, { items }): IngresoEgresoState => {
    return {
      items: [
        ...items.map(item => {
          return { ...item };
        })
      ]
    };
  }),

  on(fromMovimientos.unsetItemsAction, (state): IngresoEgresoState => {
    return {
      items: []
    };
  })
);
