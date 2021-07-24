import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffect } from './+state';

@NgModule({
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    EffectsModule.forFeature([LayoutEffect]),
  ],
})
export class LayoutModule {}
