import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { closeDialogs, showMessage } from './layout.actions';

@Injectable()
export class LayoutEffect {
  closeDialogs$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(closeDialogs),
        tap(() => this.matDialog.closeAll())
      ),
    { dispatch: false }
  );

  showMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(showMessage),
        tap(({ payload }) =>
          this.matSnackBar.open(payload, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar
  ) {}
}
