import { createAction, props } from '@ngrx/store';
import { Authentication } from '../../data';

export const login = createAction(
  '[Authentication] Login',
  props<{ payload: Authentication }>()
);
