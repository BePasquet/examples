import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'toolbar',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z9">
      <button mat-button (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
      </button>

      <button mat-button>
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Output()
  toggleSidenav = new EventEmitter<void>();
}
