import { createReducer, on } from '@ngrx/store';
import * as fromUI from './ui.actions';

export interface UiState {
  isLoading: boolean;
}

const initState: UiState = {
  isLoading: false
};

export const uiReducer = createReducer(initState,
  on(fromUI.activarLoadingAction, (state): UiState => {
    return {
      isLoading: true
    };
  }),
  on(fromUI.desactivarLoadingAction, (state): UiState => {
    return {
      isLoading: false
    };
  }),
);
