import { createAction, props } from '@ngrx/store';
import { Product, ProductFilter } from '../../../data';

export const getProducts = createAction(
  '[Products] Get Products',
  props<{ payload: ProductFilter }>()
);

export const getProductsSuccess = createAction(
  '[Products] Get Products Success',
  props<{ payload: Product[] }>()
);

export const getProductsFail = createAction(
  '[Products] Get Products Fail',
  props<{ payload: string }>()
);

export const createProduct = createAction(
  '[Products] Create Product',
  props<{ payload: Omit<Product, 'id'> }>()
);

export const createProductSuccess = createAction(
  '[Products] Create Product Success',
  props<{ payload: Product }>()
);

export const createProductFail = createAction(
  '[Products] Create Product Fail',
  props<{ payload: string }>()
);

export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ payload: Product }>()
);

export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  props<{ payload: Product }>()
);

export const updateProductFail = createAction(
  '[Products] Update Product Fail',
  props<{ payload: string }>()
);

export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ payload: { productId: string } }>()
);

export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success',
  props<{ payload: { productId: string } }>()
);

export const deleteProductFail = createAction(
  '[Products] Delete Product Fail',
  props<{ payload: string }>()
);

export const setSelectedProductId = createAction(
  '[Products] Set Selected Product Id',
  props<{ payload: { productId: string } }>()
);

export type ProductActions = ReturnType<
  | typeof getProducts
  | typeof getProductsSuccess
  | typeof getProductsFail
  | typeof createProduct
  | typeof createProductSuccess
  | typeof createProductFail
  | typeof updateProduct
  | typeof updateProductSuccess
  | typeof updateProductFail
  | typeof deleteProduct
  | typeof deleteProductSuccess
  | typeof deleteProductFail
  | typeof setSelectedProductId
>;
