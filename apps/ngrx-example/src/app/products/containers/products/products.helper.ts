import { PageEvent } from '@angular/material/paginator';
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
  '[Products Component] Search By Name',
  props<{ payload: string }>()
);

export const changeProductPage = createAction(
  '[Products Component] Change Product Page',
  props<{ payload: PageEvent }>()
);

export type SearchProductActions = ReturnType<
  typeof searchProductByName | typeof changeProductPage
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
};

export const productsFilterReducer = createReducer(
  productsFilterInitialState,
  on(searchProductByName, (state, { payload }) => ({
    ...state,
    name: payload,
    offset: 0,
  })),
  on(changeProductPage, (state, { payload: { pageIndex, pageSize } }) => ({
    ...state,
    limit: pageSize,
    offset: pageIndex * pageSize,
  }))
);
