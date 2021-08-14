import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationPartialState } from '../+state/authentication.reducer';
import {
  selectAuthenticationChecked,
  selectIsUserAuthenticated,
} from '../+state/authentication.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly store: Store<AuthenticationPartialState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectAuthenticationChecked),
      filter((checked) => checked),
      switchMap(() => this.store.pipe(select(selectIsUserAuthenticated))),
      take(1)
    );
  }
}
