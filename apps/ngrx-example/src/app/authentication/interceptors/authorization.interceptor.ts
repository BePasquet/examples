import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationPartialState } from '../+state/authentication.reducer';
import { selectAuthenticationToken } from '../+state/authentication.selectors';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<AuthenticationPartialState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(req).pipe(
      withLatestFrom(this.store.pipe(select(selectAuthenticationToken))),
      map(([req, token]) =>
        req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        })
      ),
      mergeMap((interceptedReq) => next.handle(interceptedReq))
    );
  }
}
