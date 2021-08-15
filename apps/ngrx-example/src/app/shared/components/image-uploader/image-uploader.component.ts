import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ofType } from '@ngrx/effects';
import { Action, select } from '@ngrx/store';
import { fromReducer } from 'from-reducer';
import { Observable, of, Subject, Subscription, UnaryFunction } from 'rxjs';
import { ignoreElements, map, switchMap, tap } from 'rxjs/operators';
import {
  addFiles,
  addFilesEpic,
  addFilesSuccess,
  fromUploaderFiles,
  imageUploaderInitialState,
  loadFiles,
  loadFilesEpic,
  removeFile,
  selectUploaderFiles,
  UploaderImage,
  uploaderReducer,
} from './image-uploader.helper';

@Component({
  selector: 'image-uploader',
  template: `
    <div>
      <div
        class="uploader"
        uploader
        [accepts]="['image/png', 'image/jpg']"
        [multiple]="true"
        (fileChanges)="dispatch(actions.addFiles({ payload: $event }))"
      >
        <mat-icon>upload_file</mat-icon>
      </div>

      <div class="gallery">
        <div class="gallery-item" *ngFor="let img of imgs$ | async">
          <img [src]="img.src" />

          <button (click)="dispatch(actions.removeFile({ payload: img.id }))">
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploader implements OnDestroy {
  @Input()
  set files(fs: File[]) {
    this.dispatch(loadFiles({ payload: fs }));
  }

  @Output()
  readonly valueChanges = new Subject<File[]>();

  readonly imgs$: Observable<UploaderImage[]>;

  readonly dispatch: UnaryFunction<Action, void>;

  readonly actions = { addFiles, removeFile };

  private readonly effects$: Observable<Action>;

  private readonly subscriptions = new Subscription();

  constructor() {
    const [state$, dispatch, combineEpics] = fromReducer(
      uploaderReducer,
      imageUploaderInitialState
    );

    this.dispatch = dispatch;

    this.imgs$ = state$.pipe(
      select(selectUploaderFiles),
      switchMap((files) => (!files.length ? of([]) : fromUploaderFiles(files)))
    );

    const fileChangesEpic = (actions$: Observable<Action>) =>
      actions$.pipe(
        ofType(addFilesSuccess),
        map(({ payload }) => payload.map(({ file }) => file)),
        tap((files) => this.valueChanges.next(files)),
        ignoreElements()
      );

    this.effects$ = combineEpics(loadFilesEpic, addFilesEpic, fileChangesEpic);

    this.subscriptions.add(state$.subscribe());
    this.subscriptions.add(this.effects$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
