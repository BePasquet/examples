import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthenticationCredentials } from '../data';
import {
  AuthenticationPartialState,
  checkAuthentication,
  login,
  selectAuthenticatedUser,
  selectAuthenticationChecked,
  selectAuthenticationError,
  selectAuthenticationLoading,
  selectAuthenticationToken,
  selectIsUserAuthenticated,
} from './+state';

@Injectable()
export class AuthenticationProvider {
  readonly authenticatedUser$ = this.store.pipe(
    select(selectAuthenticatedUser)
  );

  readonly authenticationChecked$ = this.store.pipe(
    select(selectAuthenticationChecked)
  );

  readonly authenticationLoading$ = this.store.pipe(
    select(selectAuthenticationLoading)
  );

  readonly authenticationError$ = this.store.pipe(
    select(selectAuthenticationError)
  );

  readonly isUserAuthenticated$ = this.store.pipe(
    select(selectIsUserAuthenticated)
  );

  readonly authenticationToken$ = this.store.pipe(
    select(selectAuthenticationToken)
  );

  constructor(private readonly store: Store<AuthenticationPartialState>) {}

  checkAuthentication(): void {
    this.store.dispatch(checkAuthentication());
  }

  login(credentials: AuthenticationCredentials): void {
    this.store.dispatch(login({ payload: credentials }));
  }
}
