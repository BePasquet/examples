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
  setSelectedProductId,
  updateProduct,
  updateProductFail,
  updateProductSuccess,
} from './products.actions';

export const PRODUCTS_STATE_KEY = 'products';

export interface ProductsState extends EntityState<Product> {
  selectedId: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface ProductsPartialState {
  [PRODUCTS_STATE_KEY]: ProductsState;
}

export const productsAdapter = createEntityAdapter<Product>();

export const productsInitialState = productsAdapter.getInitialState();

export const productsReducer = createReducer(
  productsInitialState,
  on(getProducts, (state) =>
    productsAdapter.removeAll({
      ...state,
      loading: true,
      loaded: false,
      error: '',
    })
  ),
  on(getProductsSuccess, (state, { payload }) =>
    productsAdapter.setAll(payload, {
      ...state,
      loading: false,
      loaded: true,
      error: '',
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
    productsAdapter.addOne(payload, { ...state, loading: false, error: '' })
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
    })
  ),
  on(setSelectedProductId, (state, { payload: { productId } }) => ({
    ...state,
    selectedId: productId,
  }))
);
