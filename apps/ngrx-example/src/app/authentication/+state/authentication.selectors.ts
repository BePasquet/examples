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

export const selectAuthenticationToken = createSelector(
  selectAuthenticationState,
  ({ token }) => token
);

export const selectAuthenticationLoading = createSelector(
  selectAuthenticationState,
  ({ loading }) => loading
);

export const selectAuthenticationError = createSelector(
  selectAuthenticationState,
  ({ error }) => error
);

export const selectIsUserAuthenticated = createSelector(
  selectAuthenticatedUser,
  (user) => !!user
);
