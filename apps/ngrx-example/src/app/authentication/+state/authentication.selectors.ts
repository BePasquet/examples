import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AuthenticationState,
  AUTHENTICATION_STATE_KEY,
} from './authentication.reducer';

export const selectAuthenticationState =
  createFeatureSelector<AuthenticationState>(AUTHENTICATION_STATE_KEY);

export const selectAuthenticationChecked = createSelector(
  selectAuthenticationState,
  ({ checked }) => checked
);

export const selectAuthenticatedUser = createSelector(
  selectAuthenticationState,
  ({ user }) => user
);
