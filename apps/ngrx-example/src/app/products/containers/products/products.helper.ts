import { createAction, createSelector, props } from '@ngrx/store';
import {
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
