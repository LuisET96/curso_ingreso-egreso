import { createReducer, on } from '@ngrx/store';
import * as fromUI from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false
}

export const uiReducer = createReducer(initState,
  on(fromUI.activarLogin, state => {
    return {
      isLoading: true
    }
  }),
  on(fromUI.desactivarLogin, state => {
    return {
      isLoading: false
    }
  }),
);
