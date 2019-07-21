import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromUI from './shared/ui.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  ui: fromUI.UiState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  ui: fromUI.uiReducer
};
