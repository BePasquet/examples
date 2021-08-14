import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/ngrx-example/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Authentication, AuthenticationCredentials } from '../../data';
import { User } from '../../data/interfaces/user.interface';
import { fromLocalStorage } from '../../shared/operators/from-local-storage';
import { AUTHENTICATION_TOKEN_STATE_KEY } from '../const/authentication-token-ls-key.const';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly http: HttpClient) {}

  getAuthenticationToken(): Observable<string> {
    return fromLocalStorage(AUTHENTICATION_TOKEN_STATE_KEY).pipe(
      switchMap((token) =>
        !!token ? of(token) : throwError(new Error('TOKEN_NOT_FOUND'))
      )
    );
  }

  getAuthenticatedUser(): Observable<User> {
    return this.http.get<User>(`${environment.API_URI}/user`);
  }

  login(authentication: AuthenticationCredentials): Observable<Authentication> {
    return this.http.post<Authentication>(
      `${environment.API_URI}/login`,
      authentication
    );
  }

  saveAuthenticationToken(token: string): Observable<string> {
    return new Observable((subscriber) => {
      try {
        localStorage.setItem(AUTHENTICATION_TOKEN_STATE_KEY, token);
        subscriber.next(token);
        subscriber.complete();
      } catch (e) {
        subscriber.error(e);
      }
    });
  }
}
