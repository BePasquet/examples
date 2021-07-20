import { Component, OnDestroy } from '@angular/core';
import {
  createAction,
  createSelector,
  props,
  select,
  Store,
} from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import {
  ProductsPartialState,
  selectProducts,
  selectProductsError,
  selectProductsLoaded,
  selectProductsLoading,
} from '../../+state';
import { ProductFilter } from '../../../data';

// Actions
export const searchProducts = createAction(
  '[Products Component] Search Products',
  props<{ payload: ProductFilter }>()
);

export const openProductDialog = createAction(
  '[Products Component] Open Product Dialog',
  props<{ payload: { productId: string } }>()
);

export const openDeleteConfirmationDialog = createAction(
  '[Products Component] Open Delete Confirmation Dialog',
  props<{ payload: { productId: string } }>()
);

export const acceptDeleteConfirmationDialog = createAction(
  '[Products Component] Accept Delete Confirmation Dialog',
  props<{ payload: { productId: string } }>()
);

export const cancelDeleteConfirmationDialog = createAction(
  '[Products Component] Cancel Delete Confirmation Dialog'
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

  readonly searchInput$ = new Subject<string>();

  private readonly searchProducts$ = this.searchInput$.pipe(
    debounceTime(350),
    distinctUntilChanged(),
    map((name) => searchProducts({ payload: { name } })),
    tap((action) => this.store.dispatch(action))
  );

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<ProductsPartialState>) {
    this.store.dispatch(searchProducts({ payload: { name: '' } }));
    this.subscriptions.add(this.searchProducts$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  upsertProduct(productId: string): void {
    this.store.dispatch(openProductDialog({ payload: { productId } }));
  }

  deleteProduct(productId: string): void {
    this.store.dispatch(
      openDeleteConfirmationDialog({ payload: { productId } })
    );
  }
}
