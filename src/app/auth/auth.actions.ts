import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const setUserAction = createAction(
  '[Auth] Set User',
  props<{ user: User }>()
);

export const unsetUserAction = createAction(
  '[Auth] Unset User'
);
