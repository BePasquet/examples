import { createAction, props } from '@ngrx/store';
import { Authentication, AuthenticationCredentials } from '../../data';
import { User } from '../../data/interfaces/user.interface';

export const checkAuthentication = createAction(
  '[Authentication] Check Authentication'
);

export const getAuthenticationToken = createAction(
  '[Authentication] Get Authentication Token'
);

export const getAuthenticationTokenSuccess = createAction(
  '[Authentication] Get Authentication Token Success',
  props<{ payload: { token: string } }>()
);

export const getAuthenticationTokenFail = createAction(
  '[Authentication] Get Authentication Token Fail'
);

export const getAuthenticatedUser = createAction(
  '[Authentication] Get Authentication User'
);

export const getAuthenticatedUserSuccess = createAction(
  '[Authentication] Get Authentication User Success',
  props<{ payload: User }>()
);

export const getAuthenticatedUserFail = createAction(
  '[Authentication] Get Authentication User Fail',
  props<{ payload: string }>()
);

export const login = createAction(
  '[Authentication] Login',
  props<{ payload: AuthenticationCredentials }>()
);

export const loginSuccess = createAction(
  '[Authentication] Login Success',
  props<{ payload: Authentication }>()
);

export const loginFail = createAction(
  '[Authentication] Login Fail',
  props<{ payload: string }>()
);

export const saveAuthenticationToken = createAction(
  '[Authentication] Save Authentication Token',
  props<{ payload: { token: string } }>()
);

export const saveAuthenticationTokenSuccess = createAction(
  '[Authentication] Save Authentication Token Success'
);

export const saveAuthenticationTokenFail = createAction(
  '[Authentication] Save Authentication Token Fail',
  props<{ payload: string }>()
);

export type AuthenticationActions = ReturnType<
  | typeof checkAuthentication
  | typeof getAuthenticationToken
  | typeof getAuthenticationTokenSuccess
  | typeof getAuthenticationTokenFail
  | typeof getAuthenticatedUser
  | typeof getAuthenticatedUserSuccess
  | typeof getAuthenticatedUserFail
  | typeof login
  | typeof loginSuccess
  | typeof loginFail
  | typeof saveAuthenticationToken
  | typeof saveAuthenticationTokenSuccess
  | typeof saveAuthenticationTokenFail
>;
