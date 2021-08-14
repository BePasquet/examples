import { createReducer, on } from '@ngrx/store';
import { User } from '../../data/interfaces/user.interface';
import {
  AuthenticationActions,
  checkAuthentication,
  getAuthenticatedUserFail,
  getAuthenticatedUserSuccess,
  getAuthenticationTokenFail,
  getAuthenticationTokenSuccess,
  login,
  loginFail,
  loginSuccess,
} from './authentication.actions';

export const AUTHENTICATION_STATE_KEY = 'authentication';

export interface AuthenticationState {
  checked: boolean;
  token: string;
  user: User | null;
  error: string;
  loading: boolean;
}

export interface AuthenticationPartialState {
  [AUTHENTICATION_STATE_KEY]: AuthenticationState;
}

export const authenticationInitialState: AuthenticationState = {
  checked: false,
  token: '',
  user: null,
  error: '',
  loading: false,
};

const reducer = createReducer(
  authenticationInitialState,
  on(checkAuthentication, () => ({
    ...authenticationInitialState,
    loading: true,
  })),
  on(getAuthenticationTokenSuccess, (state, { payload: { token } }) => ({
    ...state,
    token,
  })),
  on(getAuthenticationTokenFail, (state) => ({
    ...state,
    checked: true,
    token: '',
    user: null,
    loading: false,
  })),
  on(getAuthenticatedUserSuccess, (state, { payload }) => ({
    ...state,
    checked: true,
    user: { ...payload },
    error: '',
    loading: false,
  })),
  on(getAuthenticatedUserFail, (state, { payload }) => ({
    ...state,
    checked: true,
    user: null,
    error: payload,
    loading: false,
  })),
  on(login, (state) => ({ ...state, loading: true, error: '' })),
  on(loginSuccess, (state, { payload: { user, token } }) => ({
    ...state,
    checked: true,
    token,
    user: { ...user },
    loading: false,
    error: '',
  })),
  on(loginFail, (state, { payload }) => ({
    ...state,
    error: payload,
    loading: false,
  }))
);

export function authenticationReducer(
  state: AuthenticationState,
  action: AuthenticationActions
): AuthenticationState {
  return reducer(state, action);
}
