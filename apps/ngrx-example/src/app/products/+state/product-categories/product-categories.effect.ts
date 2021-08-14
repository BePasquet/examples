import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import {
  createProductCategory,
  createProductCategoryFail,
  createProductCategorySuccess,
  getMoreProductCategories,
  getMoreProductCategoriesFail,
  getMoreProductCategoriesSuccess,
  getProductCategories,
  getProductCategoriesFail,
  getProductCategoriesSuccess,
} from './product-categories.actions';

@Injectable()
export class ProductCategoriesEffect {
  getProductCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductCategories),
      switchMap(({ payload }) =>
        this.productsService.getProductCategories(payload).pipe(
          map((response) => getProductCategoriesSuccess({ payload: response })),
          catchError(({ error }) =>
            of(getProductCategoriesFail({ payload: error }))
          )
        )
      )
    )
  );

  getMoreProductCategoriesEpic = createEffect(() =>
    this.actions$.pipe(
      ofType(getMoreProductCategories),
      concatMap(({ payload }) =>
        this.productsService.getProductCategories(payload).pipe(
          map((response) =>
            getMoreProductCategoriesSuccess({ payload: response })
          ),
          catchError(({ error }) =>
            of(getMoreProductCategoriesFail({ payload: error }))
          )
        )
      )
    )
  );

  createProductCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProductCategory),
      concatMap(({ payload }) =>
        this.productsService.createProductCategory(payload).pipe(
          map((response) =>
            createProductCategorySuccess({ payload: response })
          ),
          catchError(({ error }) =>
            of(createProductCategoryFail({ payload: error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly productsService: ProductsService
  ) {}
}
