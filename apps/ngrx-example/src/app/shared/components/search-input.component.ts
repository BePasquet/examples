import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  template: `
    <mat-form-field>
      <mat-label>Search</mat-label>
      <input
        matInput
        #searchInputRef
        (input)="input.emit(searchInputRef.value)"
      />
      <mat-icon matSuffix>search</mat-icon>
    </mat-form-field>
  `,
})
export class SearchInputComponent {
  @Output()
  input = new EventEmitter<string>();
}
