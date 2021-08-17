import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  AuthenticationEffect,
  authenticationReducer,
  AUTHENTICATION_STATE_KEY,
} from './+state';

@NgModule({
  imports: [
    StoreModule.forFeature(AUTHENTICATION_STATE_KEY, authenticationReducer),
    EffectsModule.forFeature([AuthenticationEffect]),
  ],
})
export class AuthenticationProviderModule {}
