import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { DebouncedInputDirective } from './directives/debounced-input.directive';
import { UploaderDirective } from './directives/uploader.directive';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    ConfirmationDialogComponent,
    SearchInputComponent,
    DebouncedInputDirective,
    UploaderDirective,
  ],
  exports: [SearchInputComponent, UploaderDirective],
})
export class SharedModule {}
