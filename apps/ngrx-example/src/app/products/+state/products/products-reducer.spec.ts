import { createAction } from '@ngrx/store';
import { errorMessage, product, products } from '../../../test/test.data';
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
import { productsInitialState, productsReducer } from './products.reducer';

describe('Products Reducer', () => {
  it('Should return initial state on an unknown action', () => {
    const action = createAction('[Unknown]');
    const state = productsReducer(productsInitialState, action);

    expect(state).toEqual(productsInitialState);
  });

  describe('getProducts', () => {
    it('Should remove all entities, set loading to true, loaded to false and clean the error', () => {
      const successAction = getProductsSuccess({ payload: products });

      const populatedState = productsReducer(
        productsInitialState,
        successAction
      );

      const action = getProducts({ payload: { name: '' } });
      const state = productsReducer(populatedState, action);
      const expected = {
        entities: {},
        error: '',
        ids: [],
        loaded: false,
        loading: true,
      };

      expect(state).toEqual(expected);
    });
  });

  describe('getProductsSuccess', () => {
    it('Should populate the state with products, loading to false, loaded to true, and error to an empty string', () => {
      const action = getProductsSuccess({ payload: products });
      const state = productsReducer(productsInitialState, action);

      expect(state).toMatchSnapshot();
    });
  });

  describe('getProductsFail', () => {
    it('Should set loading to false, loaded to false and populate error', () => {
      const action = getProductsFail({ payload: errorMessage });
      const state = productsReducer(productsInitialState, action);

      expect(state).toMatchSnapshot();
    });
  });

  describe('createProduct', () => {
    it('Should set loading state to true and error to empty string', () => {
      const { id, ...payload } = product;
      const action = createProduct({ payload });
      const state = productsReducer(productsInitialState, action);

      expect(state).toMatchSnapshot();
    });
  });

  describe('createProductSuccess', () => {
    it('Should add a product to entities, set loading to false and error to empty string', () => {
      const action = createProductSuccess({ payload: product });
      const state = productsReducer(productsInitialState, action);

      expect(state).toMatchSnapshot();
    });
  });

  describe('createProductFail', () => {
    it('Should set loading to false and populate error', () => {
      const action = createProductFail({ payload: errorMessage });
      const state = productsReducer(productsInitialState, action);

      expect(state).toMatchSnapshot();
    });
  });

  describe('updateProduct', () => {
    it('Should set loading state to true and error to empty string', () => {
      const action = updateProduct({ payload: product });
      const state = productsReducer(productsInitialState, action);

      expect(state).toMatchSnapshot();
    });
  });

  describe('updateProductSuccess', () => {
    it('Should update a product from the entities, set loading to false, and error to empty string', () => {
      const successAction = getProductsSuccess({ payload: products });

      const populatedState = productsReducer(
        productsInitialState,
        successAction
      );

      const action = updateProductSuccess({
        payload: { ...product, name: 'Pre Workout' },
      });

      const state = productsReducer(populatedState, action);

      expect(state).toMatchSnapshot();
    });
  });

  describe('updateProductFail', () => {
    it('Should set loading to false and populate error', () => {
      const action = updateProductFail({ payload: errorMessage });
      const state = productsReducer(productsInitialState, action);

      expect(state).toMatchSnapshot();
    });
  });

  describe('deleteProduct', () => {
    it('Should set loading state to true and error to empty string', () => {
      const action = deleteProduct({ payload: { productId: product.id } });
      const state = productsReducer(productsInitialState, action);

      expect(state).toMatchSnapshot();
    });
  });

  describe('deleteProductSuccess', () => {
    it('Should remove product from entities, set loading to false and error to empty string', () => {
      const successAction = getProductsSuccess({ payload: products });

      const populatedState = productsReducer(
        productsInitialState,
        successAction
      );

      const action = deleteProductSuccess({
        payload: { productId: product.id },
      });

      const state = productsReducer(populatedState, action);

      expect(state).toMatchSnapshot();
    });
  });

  describe('deleteProductFail', () => {
    it('Should set loading to false and populate error', () => {
      const action = deleteProductFail({ payload: errorMessage });
      const state = productsReducer(productsInitialState, action);

      expect(state).toMatchSnapshot();
    });
  });
});
