import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { getProducts } from '../../+state';
import { searchProducts } from './products.component';

@Injectable()
export class ProductsComponentEffect {
  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProducts),
      map(({ payload }) => getProducts({ payload }))
    )
  );

  constructor(private readonly actions$: Actions) {}
}
