import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  AuthenticationEffect,
  authenticationReducer,
  AUTHENTICATION_STATE_KEY,
} from './+state';
import { AuthenticationProvider } from './authentication-provider';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';

@NgModule({
  imports: [
    StoreModule.forFeature(AUTHENTICATION_STATE_KEY, authenticationReducer),
    EffectsModule.forFeature([AuthenticationEffect]),
  ],
  providers: [
    AuthenticationProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
})
export class AuthenticationProviderModule {}
