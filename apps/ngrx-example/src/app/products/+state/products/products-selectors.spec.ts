import { products, productsAPIResponse } from '../../../test/test.data';
import { getProductsSuccess } from './products.actions';
import {
  productsInitialState,
  productsReducer,
  PRODUCTS_STATE_KEY,
} from './products.reducer';
import {
  selectProductEntities,
  selectProducts,
  selectProductsError,
  selectProductsLoaded,
  selectProductsLoading,
  selectProductsState,
} from './products.selectors';

describe('Products Selectors', () => {
  describe('selectProductsState', () => {
    it('Should select products state', () => {
      const appState = {
        [PRODUCTS_STATE_KEY]: productsInitialState,
      };

      const productsState = selectProductsState(appState);
      expect(productsState).toEqual(productsInitialState);
    });
  });

  describe('selectProducts', () => {
    it('Should return an array of products', () => {
      const action = getProductsSuccess({ payload: productsAPIResponse });
      const productsState = productsReducer(productsInitialState, action);
      const appState = {
        [PRODUCTS_STATE_KEY]: productsState,
      };

      const stateProducts = selectProducts(appState);
      expect(stateProducts).toEqual(products);
    });
  });
  describe('selectProductEntities', () => {
    it('Should entities property from state', () => {
      const appState = {
        [PRODUCTS_STATE_KEY]: productsInitialState,
      };

      const entities = selectProductEntities(appState);
      expect(entities).toBe(productsInitialState.entities);
    });
  });
  describe('selectProductsLoading', () => {
    it('Should return loading property from state', () => {
      const appState = {
        [PRODUCTS_STATE_KEY]: productsInitialState,
      };

      const loading = selectProductsLoading(appState);
      expect(loading).toBe(productsInitialState.loading);
    });
  });

  describe('selectProductsLoaded', () => {
    it('Should return loaded property from state', () => {
      const appState = {
        [PRODUCTS_STATE_KEY]: productsInitialState,
      };

      const loaded = selectProductsLoaded(appState);
      expect(loaded).toBe(productsInitialState.loaded);
    });
  });

  describe('selectProductsError', () => {
    it('Should return error property from state', () => {
      const appState = {
        [PRODUCTS_STATE_KEY]: productsInitialState,
      };

      const error = selectProductsError(appState);
      expect(error).toBe(productsInitialState.error);
    });
  });
});
