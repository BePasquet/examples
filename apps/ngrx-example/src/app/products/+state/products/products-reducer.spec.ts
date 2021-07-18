import { createAction } from '@ngrx/store';
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
import { productsInitialState, productsReducer } from './products.reducer';

const errorMessage = 'ERROR';

const product: Product = {
  id: '1',
  name: 'Whey Protein',
  description: 'lorem ipsum',
  active: true,
  categoryId: '1',
  discount: 0,
  images: [],
  price: 100,
  rating: 5,
  stock: 100,
};

const products: Product[] = [product];

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
      const expected = {
        entities: {
          1: {
            id: '1',
            name: 'Whey Protein',
            description: 'lorem ipsum',
            active: true,
            categoryId: '1',
            discount: 0,
            images: [],
            price: 100,
            rating: 5,
            stock: 100,
          },
        },
        error: '',
        ids: ['1'],
        loaded: true,
        loading: false,
      };

      expect(state).toEqual(expected);
    });
  });

  describe('getProductsFail', () => {
    it('Should set loading to false, loaded to false and populate error', () => {
      const action = getProductsFail({ payload: errorMessage });
      const state = productsReducer(productsInitialState, action);
      const expected = {
        loading: false,
        entities: {},
        ids: [],
        loaded: false,
        error: errorMessage,
      };

      expect(state).toEqual(expected);
    });
  });

  describe('createProduct', () => {
    it('Should set loading state to true and error to empty string', () => {
      const { id, ...payload } = product;
      const action = createProduct({ payload });
      const state = productsReducer(productsInitialState, action);
      const expected = { ...productsInitialState, loading: true };
      expect(state).toEqual(expected);
    });
  });

  describe('createProductSuccess', () => {
    it('Should add a product to entities, set loading to false and error to empty string', () => {
      const action = createProductSuccess({ payload: product });
      const state = productsReducer(productsInitialState, action);
      const expected = {
        entities: {
          1: product,
        },
        ids: ['1'],
        loaded: false,
        loading: false,
        error: '',
      };

      expect(state).toEqual(expected);
    });
  });

  describe('createProductFail', () => {
    it('Should set loading to false and populate error', () => {
      const action = createProductFail({ payload: errorMessage });
      const state = productsReducer(productsInitialState, action);
      const expected = {
        loading: false,
        entities: {},
        ids: [],
        loaded: false,
        error: errorMessage,
      };

      expect(state).toEqual(expected);
    });
  });

  describe('updateProduct', () => {
    it('Should set loading state to true and error to empty string', () => {
      const action = updateProduct({ payload: product });
      const state = productsReducer(productsInitialState, action);
      const expected = { ...productsInitialState, loading: true };
      expect(state).toEqual(expected);
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
      const expected = {
        entities: {
          '1': {
            active: true,
            categoryId: '1',
            description: 'lorem ipsum',
            discount: 0,
            id: '1',
            images: [],
            name: 'Pre Workout',
            price: 100,
            rating: 5,
            stock: 100,
          },
        },
        error: '',
        ids: ['1'],
        loaded: true,
        loading: false,
      };

      expect(state).toEqual(expected);
    });
  });

  describe('updateProductFail', () => {
    it('Should set loading to false and populate error', () => {
      const action = updateProductFail({ payload: errorMessage });
      const state = productsReducer(productsInitialState, action);
      const expected = {
        loading: false,
        entities: {},
        ids: [],
        loaded: false,
        error: errorMessage,
      };

      expect(state).toEqual(expected);
    });
  });

  describe('deleteProduct', () => {
    it('Should set loading state to true and error to empty string', () => {
      const action = deleteProduct({ payload: { productId: product.id } });
      const state = productsReducer(productsInitialState, action);
      const expected = { ...productsInitialState, loading: true };
      expect(state).toEqual(expected);
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

      const expected = {
        entities: {},
        ids: [],
        loading: false,
        loaded: true,
        error: '',
      };

      expect(state).toEqual(expected);
    });
  });

  describe('deleteProductFail', () => {
    it('Should set loading to false and populate error', () => {
      const action = deleteProductFail({ payload: errorMessage });
      const state = productsReducer(productsInitialState, action);
      const expected = {
        loading: false,
        entities: {},
        ids: [],
        loaded: false,
        error: errorMessage,
      };

      expect(state).toEqual(expected);
    });
  });
});
