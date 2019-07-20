import { createAction, props } from '@ngrx/store';

export const activarLogin = createAction(
  '[UI Loading] Cargando...'
);

export const desactivarLogin = createAction(
  '[UI Loading] Fin de carga...'
);
