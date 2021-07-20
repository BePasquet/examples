import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  template: `<div>
    <h2>Are you sure you want to delete this product?</h2>
    <div>
      <button [mat-dialog-close]>CANCEL</button>
      <button [mat-dialog-close]="true">ACCEPT</button>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {}
