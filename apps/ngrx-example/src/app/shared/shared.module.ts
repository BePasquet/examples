import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationDialogComponent } from './components/confirmation-dialog.component';
import { SearchInputComponent } from './components/search-input.component';

@NgModule({
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule],
  declarations: [ConfirmationDialogComponent, SearchInputComponent],
  exports: [SearchInputComponent],
})
export class SharedModule {}
