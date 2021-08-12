import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AuthenticationPartialState } from '../+state/authentication.reducer';
import {
  selectAuthenticatedUser,
  selectAuthenticationChecked,
} from '../+state/authentication.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  private readonly authenticationChecked$ = this.store.pipe(
    select(selectAuthenticationChecked),
    filter((auth) => auth)
  );

  private readonly isAuthenticated$ = this.store.pipe(
    select(selectAuthenticatedUser),
    map((user) => !!user)
  );

  constructor(private readonly store: Store<AuthenticationPartialState>) {}

  canActivate(): Observable<boolean> {
    return this.authenticationChecked$.pipe(
      switchMap(() => this.isAuthenticated$),
      take(1)
    );
  }
}
