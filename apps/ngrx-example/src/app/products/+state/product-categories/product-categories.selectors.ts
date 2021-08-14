import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  productCategoriesAdapter,
  ProductCategoriesState,
  PRODUCT_CATEGORIES_STATE_KEY,
} from './product-categories.reducer';

const { selectAll } = productCategoriesAdapter.getSelectors();

export const selectProductCategoryState =
  createFeatureSelector<ProductCategoriesState>(PRODUCT_CATEGORIES_STATE_KEY);

export const selectProductCategories = createSelector(
  selectProductCategoryState,
  selectAll
);

export const selectProductCategoryLoading = createSelector(
  selectProductCategoryState,
  ({ loading }) => loading
);

export const selectProductCategoryLoaded = createSelector(
  selectProductCategoryState,
  ({ loaded }) => loaded
);

export const selectProductCategoryError = createSelector(
  selectProductCategoryState,
  ({ error }) => error
);

export const selectProductCategoryTotal = createSelector(
  selectProductCategoryState,
  ({ total }) => total
);
