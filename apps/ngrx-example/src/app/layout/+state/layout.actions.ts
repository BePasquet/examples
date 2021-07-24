import { createAction, props } from '@ngrx/store';

export const showMessage = createAction(
  '[Layout] Show Message',
  props<{ payload: string }>()
);

export const closeDialogs = createAction('[Layout] Close All Dialogs');
