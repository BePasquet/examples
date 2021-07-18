import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import {
  createProduct,
  createProductFail,
  createProductSuccess,
  deleteProduct,
  deleteProductFail,
  deleteProductSuccess,
  getProducts,
  getProductsFail,
  getProductsSuccess,
  updateProduct,
  updateProductFail,
  updateProductSuccess,
} from './products.actions';

@Injectable()
export class ProductsEffect {
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      switchMap(({ payload }) =>
        this.productsService.getProducts(payload).pipe(
          map((response) => getProductsSuccess({ payload: response })),
          catchError(({ error }) => of(getProductsFail({ payload: error })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      exhaustMap(({ payload }) =>
        this.productsService.createProduct(payload).pipe(
          map((response) => createProductSuccess({ payload: response })),
          catchError(({ error }) => of(createProductFail({ payload: error })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      concatMap(({ payload }) =>
        this.productsService.updateProduct(payload).pipe(
          map(() => updateProductSuccess({ payload })),
          catchError(({ error }) => of(updateProductFail({ payload: error })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap(({ payload: { productId } }) =>
        this.productsService.deleteProduct(productId).pipe(
          map(() => deleteProductSuccess({ payload: { productId } })),
          catchError(({ error }) => of(deleteProductFail({ payload: error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly productsService: ProductsService
  ) {}
}
