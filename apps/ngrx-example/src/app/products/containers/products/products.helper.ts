import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import {
  selectProducts,
  selectProductsError,
  selectProductsLoaded,
  selectProductsLoading,
  selectProductsTotal,
} from '../../+state';
import { ProductFilter } from '../../../data';

// Actions

export const openProductsComponent = createAction(
  '[Products] Open Products Component'
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

export const searchProductByName = createAction(
  '[Products Component] Search Products By Name',
  props<{ payload: string }>()
);

export const changeProductsPage = createAction(
  '[Products Component] Change Product Page',
  props<{ payload: PageEvent }>()
);

export const sortProducts = createAction(
  '[Products Component] Sort Products',
  props<{ payload: Sort }>()
);

export type ProductComponentEvents = ReturnType<
  typeof searchProductByName | typeof changeProductsPage | typeof sortProducts
>;

// Selectors
export const selectProductsVM = createSelector(
  selectProducts,
  selectProductsTotal,
  selectProductsLoading,
  selectProductsLoaded,
  selectProductsError,
  (products, total, loading, loaded, error) => ({
    products,
    total,
    loading,
    loaded,
    error,
  })
);

export const productsFilterInitialState: ProductFilter = {
  name: '',
  limit: 10,
  offset: 0,
  sort: { key: 'name', direction: 'asc' },
};

export const productsFilterReducer = createReducer(
  productsFilterInitialState,
  on(searchProductByName, (state, { payload }) => ({
    ...state,
    name: payload,
    offset: 0,
  })),
  on(changeProductsPage, (state, { payload: { pageIndex, pageSize } }) => ({
    ...state,
    limit: pageSize,
    offset: pageIndex * pageSize,
  })),
  on(sortProducts, (state, { payload: { active, direction } }) => ({
    ...state,
    offset: 0,
    sort: { key: active, direction },
  })),
  on(openProductsComponent, (state) => ({
    ...state,
    ...productsFilterInitialState,
  }))
);
