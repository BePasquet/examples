import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthenticationProvider } from '../authentication-provider';

@Injectable({ providedIn: 'root' })
export class NonAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly authenticationProvider: AuthenticationProvider
  ) {}

  canActivate(): Observable<boolean> {
    return this.authenticationProvider.authenticationChecked$.pipe(
      filter((checked) => checked),
      switchMap(() => this.authenticationProvider.isUserAuthenticated$),
      map((isAuthenticated) => !isAuthenticated)
    );
  }
}
