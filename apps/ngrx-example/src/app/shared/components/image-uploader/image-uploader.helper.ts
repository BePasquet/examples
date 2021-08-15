import { ofType } from '@ngrx/effects';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createAction, createReducer, on, props } from '@ngrx/store';
import { Action } from 'from-reducer';
import { nanoid } from 'nanoid';
import { forkJoin, fromEvent, map, Observable, take } from 'rxjs';

export interface UploaderImage {
  id: string;
  src: string;
}

export interface UploaderFile {
  id: string;
  file: File;
}

export function fromUploaderFiles(
  files: UploaderFile[]
): Observable<UploaderImage[]> {
  const readerResults = files.map(({ id, file }) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return fromEvent(reader, 'loadend').pipe(
      map(() => ({
        id,
        src: reader.result as string,
      })),
      take(1)
    );
  });

  return forkJoin(readerResults);
}

export const loadFiles = createAction(
  '[Image Uploader] Load Files',
  props<{ payload: File[] }>()
);

export const loadFilesSuccess = createAction(
  '[Image Uploader] Load Files Success',
  props<{ payload: UploaderFile[] }>()
);

export const addFiles = createAction(
  '[Image Uploader] Add Files',
  props<{ payload: File[] }>()
);

export const addFilesSuccess = createAction(
  '[Image Uploader] Add Files Success',
  props<{ payload: UploaderFile[] }>()
);

export const removeFile = createAction(
  '[Image Uploader] Remove File',
  props<{ payload: string }>()
);

export interface ImageUploaderState extends EntityState<UploaderFile> {}

export const uploaderAdapter = createEntityAdapter<UploaderFile>();

export const imageUploaderInitialState: ImageUploaderState =
  uploaderAdapter.getInitialState();

export const uploaderReducer = createReducer(
  imageUploaderInitialState,
  on(loadFilesSuccess, (state, { payload }) =>
    uploaderAdapter.setAll(payload, state)
  ),
  on(addFilesSuccess, (state, { payload }) =>
    uploaderAdapter.upsertMany(payload, state)
  ),
  on(removeFile, (state, { payload }) =>
    uploaderAdapter.removeOne(payload, state)
  )
);

export const filesToUploaderFiles = (files: File[]) =>
  files.map((file) => ({ id: nanoid(), file }));

export const loadFilesEpic = (actions$: Observable<Action>) =>
  actions$.pipe(
    ofType(loadFiles),
    map(({ payload }) =>
      loadFilesSuccess({ payload: filesToUploaderFiles(payload) })
    )
  );

export const addFilesEpic = (actions$: Observable<Action>) =>
  actions$.pipe(
    ofType(addFiles),
    map(({ payload }) =>
      addFilesSuccess({ payload: filesToUploaderFiles(payload) })
    )
  );

export const { selectAll: selectUploaderFiles } =
  uploaderAdapter.getSelectors();
