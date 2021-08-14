import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationProvider } from '../authentication-provider';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private readonly authenticationProvider: AuthenticationProvider
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(req).pipe(
      withLatestFrom(this.authenticationProvider.authenticationToken$),
      map(([req, token]) =>
        req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        })
      ),
      mergeMap((interceptedReq) => next.handle(interceptedReq))
    );
  }
}
