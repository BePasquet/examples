import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import {
  checkAuthentication,
  getAuthenticatedUser,
  getAuthenticatedUserFail,
  getAuthenticatedUserSuccess,
  getAuthenticationToken,
  getAuthenticationTokenFail,
  getAuthenticationTokenSuccess,
  login,
  loginFail,
  loginSuccess,
  saveAuthenticationToken,
  saveAuthenticationTokenFail,
  saveAuthenticationTokenSuccess,
} from './authentication.actions';

@Injectable()
export class AuthenticationEffect {
  checkAuthentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuthentication),
      map(() => getAuthenticationToken())
    )
  );

  getAuthenticationToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAuthenticationToken),
      switchMap(() =>
        this.authenticationService.getAuthenticationToken().pipe(
          map((token) => getAuthenticationTokenSuccess({ payload: { token } })),
          catchError(() => of(getAuthenticationTokenFail()))
        )
      )
    )
  );

  getAuthenticationTokenSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAuthenticationTokenSuccess),
      map(() => getAuthenticatedUser())
    )
  );

  getAuthenticatedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAuthenticatedUser),
      switchMap(() =>
        this.authenticationService.getAuthenticatedUser().pipe(
          map((user) => getAuthenticatedUserSuccess({ payload: user })),
          catchError(({ error }) =>
            of(getAuthenticatedUserFail({ payload: error }))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ payload }) =>
        this.authenticationService.login(payload).pipe(
          map((response) => loginSuccess({ payload: response })),
          catchError(({ error }) => of(loginFail({ payload: error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map(({ payload }) => saveAuthenticationToken({ payload }))
    )
  );

  saveAuthenticationToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveAuthenticationToken),
      switchMap(({ payload: { token } }) =>
        this.authenticationService.saveAuthenticationToken(token).pipe(
          map(() => saveAuthenticationTokenSuccess()),
          catchError((err) => of(saveAuthenticationTokenFail({ payload: err })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authenticationService: AuthenticationService
  ) {}
}
