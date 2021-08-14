import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductCategory } from '../../../data';
import { createProduct, createProductSuccess } from '../products';
import {
  createProductCategoryFail,
  getMoreProductCategories,
  getMoreProductCategoriesFail,
  getMoreProductCategoriesSuccess,
  getProductCategories,
  getProductCategoriesFail,
  getProductCategoriesSuccess,
} from './product-categories.actions';

export const PRODUCT_CATEGORIES_STATE_KEY = 'productCategories';

export interface ProductCategoriesState extends EntityState<ProductCategory> {
  loading: boolean;
  loaded: boolean;
  error: '';
  total: 0;
}

export interface ProductCategoriesPartialState {
  [PRODUCT_CATEGORIES_STATE_KEY]: ProductCategoriesState;
}

export const productCategoriesAdapter = createEntityAdapter<ProductCategory>();

export const productCategoriesInitialState =
  productCategoriesAdapter.getInitialState({
    loading: false,
    loaded: false,
    error: '',
    total: 0,
  });

export const productsCategoriesReducer = createReducer(
  productCategoriesInitialState,

  on(getProductCategories, (state) =>
    productCategoriesAdapter.removeAll({
      ...state,
      loaded: false,
      loading: true,
      error: '',
      total: 0,
    })
  ),
  on(getProductCategoriesSuccess, (state, { payload: { results, total } }) =>
    productCategoriesAdapter.setAll(results, {
      ...state,
      loading: false,
      loaded: true,
      error: '',
      total,
    })
  ),
  on(getProductCategoriesFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),
  on(getMoreProductCategories, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(
    getMoreProductCategoriesSuccess,
    (state, { payload: { results, total } }) =>
      productCategoriesAdapter.addMany(results, {
        ...state,
        loading: false,
        error: '',
        total,
      })
  ),
  on(getMoreProductCategoriesFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(createProduct, (state) => ({ ...state, loading: true, error: '' })),
  on(createProductSuccess, (state, { payload }) =>
    productCategoriesAdapter.addOne(payload, {
      ...state,
      loading: false,
      error: '',
    })
  ),
  on(createProductCategoryFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }))
);
