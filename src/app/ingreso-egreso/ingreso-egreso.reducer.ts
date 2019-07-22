import { createReducer, on } from '@ngrx/store';
import * as fromMovimientos from './ingreso-egreso.actions';

import { IngresoEgresoModel } from './ingreso-egreso.model';

export interface IngresoEgresoState {
  items: IngresoEgresoModel[];
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

  on(fromMovimientos.removeItemsAction, (state): IngresoEgresoState => {
    return {
      items: []
    };
  })
);
