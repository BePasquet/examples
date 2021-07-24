import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import {
  createProductFail,
  createProductSuccess,
  deleteProduct,
  deleteProductFail,
  deleteProductSuccess,
  getProducts,
  ProductsPartialState,
  selectProductEntities,
  updateProductFail,
  updateProductSuccess,
} from '../../+state';
import { closeDialogs, showMessage } from '../../../layout';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import {
  acceptDeleteConfirmationDialog,
  cancelDeleteConfirmationDialog,
  openDeleteConfirmationDialog,
  openProductDialog,
  searchProducts,
} from './products.helper';

@Injectable()
export class ProductsComponentEffect {
  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProducts),
      map(({ payload }) => getProducts({ payload }))
    )
  );

  openProductDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openProductDialog),
        withLatestFrom(this.store.pipe(select(selectProductEntities))),
        map(
          ([
            {
              payload: { productId },
            },
            entities,
          ]) => entities[productId] ?? null
        ),
        exhaustMap((data) =>
          this.matDialog.open(ProductFormComponent, { data }).afterClosed()
        )
      ),
    { dispatch: false }
  );

  openDeleteConfirmationDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openDeleteConfirmationDialog),
      exhaustMap(({ payload: { productId } }) =>
        this.matDialog
          .open(ConfirmationDialogComponent)
          .afterClosed()
          .pipe(
            map((accept) =>
              accept
                ? acceptDeleteConfirmationDialog({ payload: { productId } })
                : cancelDeleteConfirmationDialog()
            )
          )
      )
    )
  );

  acceptDeleteConfirmationDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(acceptDeleteConfirmationDialog),
      map(({ payload }) => deleteProduct({ payload }))
    )
  );

  upsertProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProductSuccess, updateProductSuccess),
      map(({ type }) =>
        type === createProductSuccess.type
          ? 'Product created!'
          : 'Product updated!'
      ),
      concatMap((message) => [
        closeDialogs(),
        showMessage({ payload: message }),
      ])
    )
  );

  deleteProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductSuccess),
      concatMap(() => [
        closeDialogs(),
        showMessage({ payload: `Product deleted!` }),
      ])
    )
  );

  createUpdateDeleteFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProductFail, updateProductFail, deleteProductFail),
      map(() =>
        showMessage({ payload: `There was an error please try again later` })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<ProductsPartialState>,
    private readonly matDialog: MatDialog
  ) {}
}
