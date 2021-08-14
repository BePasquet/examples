import { createAction, props } from '@ngrx/store';
import { EntitiesWithTotal, Pagination, ProductCategory } from '../../../data';

export const getProductCategories = createAction(
  '[Product Categories] Get Product Categories',
  props<{ payload: Pagination }>()
);
export const getProductCategoriesSuccess = createAction(
  '[Product Categories] Get Product Categories Success',
  props<{ payload: EntitiesWithTotal<ProductCategory> }>()
);

export const getProductCategoriesFail = createAction(
  '[Product Categories] Get Product Categories Fail',
  props<{ payload: string }>()
);

export const getMoreProductCategories = createAction(
  '[Product Categories] Get More Product Categories',
  props<{ payload: Pagination }>()
);
export const getMoreProductCategoriesSuccess = createAction(
  '[Product Categories] Get More Product Categories Success',
  props<{ payload: EntitiesWithTotal<ProductCategory> }>()
);

export const getMoreProductCategoriesFail = createAction(
  '[Product Categories] Get More Product Categories Fail',
  props<{ payload: string }>()
);

export const createProductCategory = createAction(
  '[Product Category] Create Product Category',
  props<{ payload: { name: string } }>()
);

export const createProductCategorySuccess = createAction(
  '[Product Category] Create Product Category Success',
  props<{ payload: ProductCategory }>()
);

export const createProductCategoryFail = createAction(
  '[Product Category] Create Product Category Fail',
  props<{ payload: string }>()
);
