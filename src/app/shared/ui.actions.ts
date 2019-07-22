import { createAction } from '@ngrx/store';

export const activarLoadingAction = createAction(
  '[UI Loading] Cargando...'
);

export const desactivarLoadingAction = createAction(
  '[UI Loading] Fin de carga...'
);
