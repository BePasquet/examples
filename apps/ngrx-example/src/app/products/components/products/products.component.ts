import { Component, OnDestroy } from '@angular/core';
import {
  createAction,
  createSelector,
  props,
  select,
  Store,
} from '@ngrx/store';
import { merge, Subject, Subscription } from 'rxjs';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs/operators';
import {
  ProductsPartialState,
  selectProducts,
  selectProductsError,
  selectProductsLoaded,
  selectProductsLoading,
  setSelectedProductId,
} from '../../+state';
import { ProductFilter } from '../../../data';

// Actions
export const searchProducts = createAction(
  '[Products Component] Search Products',
  props<{ payload: ProductFilter }>()
);

export const openProductDialog = createAction(
  '[Products Component] Open Product Dialog'
);

export const openConfirmationDialog = createAction(
  '[Products Component] Open Confirmation Dialog',
  props<{ payload: { productId: string } }>()
);

// Selectors
export const selectProductsVM = createSelector(
  selectProducts,
  selectProductsLoading,
  selectProductsLoaded,
  selectProductsError,
  (products, loading, loaded, error) => ({ products, loading, loaded, error })
);

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnDestroy {
  readonly state$ = this.store.pipe(select(selectProductsVM));

  // Controls
  readonly searchInput$ = new Subject<string>();

  readonly createUpdateClick$ = new Subject<{ productId: string }>();

  readonly deleteClick$ = new Subject<{ productId: string }>();

  private readonly searchProducts$ = this.searchInput$.pipe(
    startWith(''),
    debounceTime(350),
    distinctUntilChanged(),
    map((name) => searchProducts({ payload: { name } }))
  );

  private readonly showProductDialog$ = this.createUpdateClick$.pipe(
    concatMap(({ productId }) => [
      setSelectedProductId({ payload: { productId } }),
      openProductDialog(),
    ])
  );

  private readonly showConfirmationDialog$ = this.deleteClick$.pipe(
    map(({ productId }) => openConfirmationDialog({ payload: { productId } }))
  );

  private readonly componentActions$ = merge(
    this.searchProducts$,
    this.showProductDialog$,
    this.showConfirmationDialog$
  ).pipe(tap((action) => this.store.dispatch(action)));

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<ProductsPartialState>) {
    this.subscriptions.add(this.componentActions$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
