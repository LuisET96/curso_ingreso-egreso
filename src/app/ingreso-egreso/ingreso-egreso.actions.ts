import { createAction, props } from '@ngrx/store';
import { IngresoEgresoModel } from './ingreso-egreso.model';

export const setItemsAction = createAction(
  '[IngresoEgreso] Crear movimiento',
  props<{ items: IngresoEgresoModel[] }>()
);

export const unsetItemsAction = createAction(
  '[IngresoEgreso] Remover movimiento'
);
