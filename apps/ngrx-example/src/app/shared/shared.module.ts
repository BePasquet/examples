import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog.component';

@NgModule({
  imports: [MatDialogModule],
  declarations: [ConfirmationDialogComponent],
})
export class SharedModule {}
