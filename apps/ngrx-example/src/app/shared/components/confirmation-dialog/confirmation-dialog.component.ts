import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title: string;
  body?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  template: `<div class="confirmation-dialog-container">
    <h2>{{ data.title }}</h2>

    <p *ngIf="!!data.body">
      {{ data.body }}
    </p>

    <div class="buttons-container">
      <button mat-raised-button [mat-dialog-close]>CANCEL</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">
        ACCEPT
      </button>
    </div>
  </div>`,
  styleUrls: ['./confirmation-dialog-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmationDialogData
  ) {}
}
