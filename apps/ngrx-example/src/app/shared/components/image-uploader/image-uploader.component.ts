import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'image-uploader',
  template: `
    <div>
      <div
        class="uploader"
        uploader
        [accepts]="['image/png', 'image/jpg']"
        [multiple]="true"
        (fileChanges)="valueChanges.emit($event)"
      >
        <mat-icon>upload_file</mat-icon>
      </div>
    </div>
  `,
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploader {
  @Output()
  readonly valueChanges = new EventEmitter();
}
