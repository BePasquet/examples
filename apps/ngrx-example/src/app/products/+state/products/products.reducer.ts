import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../data';
import {
  createProduct,
  createProductFail,
  createProductSuccess,
  deleteProduct,
  deleteProductFail,
  deleteProductSuccess,
  getProducts,
  getProductsFail,
  getProductsSuccess,
  updateProduct,
  updateProductFail,
  updateProductSuccess,
} from './products.actions';

export const PRODUCTS_STATE_KEY = 'products';

export interface ProductsState extends EntityState<Product> {
  total: number;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface ProductsPartialState {
  [PRODUCTS_STATE_KEY]: ProductsState;
}

export const productsAdapter = createEntityAdapter<Product>();

export const productsInitialState = productsAdapter.getInitialState({
  total: 0,
  loading: false,
  loaded: false,
  error: '',
});

export const productsReducer = createReducer(
  productsInitialState,
  on(getProducts, (state) =>
    productsAdapter.removeAll({
      ...state,
      loading: true,
      loaded: false,
      error: '',
      total: 0,
    })
  ),
  on(getProductsSuccess, (state, { payload: { results, total } }) =>
    productsAdapter.setAll(results, {
      ...state,
      loading: false,
      loaded: true,
      error: '',
      total,
    })
  ),
  on(getProductsFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),
  on(createProduct, updateProduct, deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(
    createProductFail,
    updateProductFail,
    deleteProductFail,
    (state, { payload }) => ({ ...state, loading: false, error: payload })
  ),
  on(createProductSuccess, (state, { payload }) =>
    productsAdapter.addOne(payload, {
      ...state,
      loading: false,
      error: '',
      total: state.total + 1,
    })
  ),
  on(updateProductSuccess, (state, { payload }) =>
    productsAdapter.updateOne(
      { id: payload.id, changes: { ...payload } },
      { ...state, loading: false, error: '' }
    )
  ),
  on(deleteProductSuccess, (state, { payload: { productId } }) =>
    productsAdapter.removeOne(productId, {
      ...state,
      loading: false,
      error: '',
      total: state.total - 1,
    })
  )
);
