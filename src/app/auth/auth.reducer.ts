import { createReducer, on } from '@ngrx/store';

import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(initialState,
  on(fromAuth.setUserAction, (state, { user }): AuthState => {
    return {
      user
    };
  })
);
