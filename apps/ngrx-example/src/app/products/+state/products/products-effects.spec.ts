import { TestScheduler } from 'rxjs/testing';
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
import { ProductsEffect } from './products.effect';

let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
});

describe('Products Effect', () => {
  describe('getProducts$', () => {
    it('Should intercept getProducts action, call product service getProducts cancel it, call it again and return getProductsSuccess with products as payload', () => {
      testScheduler.run(({ hot, cold, expectObservable, flush }) => {
        const a = '-aa';
        const b = '---b|';
        const c = '-----c';

        const payload = { name: '' };
        const initiatorAction = getProducts({ payload });
        const successAction = getProductsSuccess({ payload: products });

        const actions$ = hot(a, {
          a: initiatorAction,
        });

        const productsService = {
          getProducts: jest.fn(() => cold(b, { b: products })),
        } as any;
        ``;

        const productsEffect = new ProductsEffect(actions$, productsService);

        expectObservable(productsEffect.getProducts$).toBe(c, {
          c: successAction,
        });

        flush();

        expect(productsService.getProducts).toHaveBeenCalledTimes(2);
        expect(productsService.getProducts).toBeCalledWith(payload);
      });
    });

    it('Should intercept getProducts action, call product service getProducts return getProductsFail with error as a payload', () => {
      testScheduler.run(({ hot, cold, expectObservable, flush }) => {
        const a = '-a';
        const b = '--#';
        const c = '---c';

        const payload = { name: '' };
        const initiatorAction = getProducts({ payload });
        const failAction = getProductsFail({ payload: errorMessage });

        const actions$ = hot(a, { a: initiatorAction });

        const productsService = {
          getProducts: jest.fn(() => cold(b, {}, { error: errorMessage })),
        } as any;

        const productsEffect = new ProductsEffect(actions$, productsService);

        expectObservable(productsEffect.getProducts$).toBe(c, {
          c: failAction,
        });

        flush();

        expect(productsService.getProducts).toHaveBeenCalledTimes(1);
        expect(productsService.getProducts).toBeCalledWith(payload);
      });
    });
  });

  describe('createProduct$', () => {
    it('Should intercept createProduct action, omit incoming actions while creating a product and return createProductSuccess action with product as payload', () => {
      testScheduler.run(({ hot, cold, expectObservable, flush }) => {
        const a = '-aa';
        const b = '--b|';
        const c = '---c';

        const { id: deleted, ...newProduct } = product;

        const initiatorAction = createProduct({ payload: newProduct });

        const successAction = createProductSuccess({ payload: product });

        const actions$ = hot(a, { a: initiatorAction });

        const productsService = {
          createProduct: jest.fn(() => cold(b, { b: product })),
        } as any;

        const productEffect = new ProductsEffect(actions$, productsService);

        expectObservable(productEffect.createProduct$).toBe(c, {
          c: successAction,
        });

        flush();

        expect(productsService.createProduct).toHaveBeenCalledTimes(1);
        expect(productsService.createProduct).toHaveBeenCalledWith(newProduct);
      });
    });
  });

  it('Should intercept createProduct action, try to create a product and when error return createProductFail action with error message as payload', () => {
    testScheduler.run(({ hot, cold, expectObservable, flush }) => {
      const a = '-a';
      const b = '--#';
      const c = '---c';

      const { id: deleted, ...newProduct } = product;
      const initiatorAction = createProduct({ payload: newProduct });
      const failAction = createProductFail({ payload: errorMessage });

      const actions$ = hot(a, { a: initiatorAction });

      const productsService = {
        createProduct: jest.fn(() => cold(b, {}, { error: errorMessage })),
      } as any;

      const productsEffect = new ProductsEffect(actions$, productsService);

      expectObservable(productsEffect.createProduct$).toBe(c, {
        c: failAction,
      });

      flush();

      expect(productsService.createProduct).toHaveBeenCalledTimes(1);
      expect(productsService.createProduct).toHaveBeenCalledWith(newProduct);
    });
  });

  describe('updateProduct$', () => {
    it('Should intercept updateProduct action, concat every incoming action update a product and return updateProductSuccess action with product as payload', () => {
      testScheduler.run(({ hot, cold, expectObservable, flush }) => {
        const a = '-a-d';
        const b = '--b|';
        const c = '---c--e';

        const firstUpdatePayload = { ...product, name: 'Shaker' };
        const firstInitiatorAction = updateProduct({
          payload: firstUpdatePayload,
        });

        const secondUpdatePayload = { ...product, price: 20 };
        const secondInitiatorAction = updateProduct({
          payload: secondUpdatePayload,
        });

        const firstSuccessAction = updateProductSuccess({
          payload: firstUpdatePayload,
        });

        const secondSuccessAction = updateProductSuccess({
          payload: secondUpdatePayload,
        });

        const actions$ = hot(a, {
          a: firstInitiatorAction,
          d: secondInitiatorAction,
        });

        const productsService = {
          updateProduct: jest.fn(() => cold(b)),
        } as any;

        const productsEffect = new ProductsEffect(actions$, productsService);

        expectObservable(productsEffect.updateProduct$).toBe(c, {
          c: firstSuccessAction,
          e: secondSuccessAction,
        });

        flush();

        expect(productsService.updateProduct).toHaveBeenCalledTimes(2);
        expect(productsService.updateProduct).toHaveBeenCalledWith(
          firstUpdatePayload
        );
      });
    });

    it('Should intercept updateProduct action, try to create a product and when error return updateProductFail action with error message as payload', () => {
      testScheduler.run(({ hot, cold, expectObservable, flush }) => {
        const a = '-a';
        const b = '-#';
        const c = '--c';

        const initiatorAction = updateProduct({ payload: product });
        const failAction = updateProductFail({ payload: errorMessage });

        const actions$ = hot(a, { a: initiatorAction });

        const productsService = {
          updateProduct: jest.fn(() => cold(b, {}, { error: errorMessage })),
        } as any;

        const productsEffect = new ProductsEffect(actions$, productsService);

        expectObservable(productsEffect.updateProduct$).toBe(c, {
          c: failAction,
        });

        flush();

        expect(productsService.updateProduct).toHaveBeenCalledTimes(1);
        expect(productsService.updateProduct).toHaveBeenCalledWith(product);
      });
    });
  });

  describe('deleteProduct$', () => {
    it('Should intercept deleteProductAction, merge incoming actions delete a product and return deleteProductSuccess with id as payload', () => {
      testScheduler.run(({ hot, cold, expectObservable, flush }) => {
        const a = '-a-b';
        const b = '--c|-d|';
        const c = '---e-f';

        const firstActionPayload = { productId: '1' };
        const firstInitiatorAction = deleteProduct({
          payload: firstActionPayload,
        });

        const firstSuccessAction = deleteProductSuccess({
          payload: firstActionPayload,
        });

        const secondActionPayload = { productId: '2' };
        const secondInitiatorAction = deleteProduct({
          payload: secondActionPayload,
        });

        const secondSuccessAction = deleteProductSuccess({
          payload: secondActionPayload,
        });

        const actions$ = hot(a, {
          a: firstInitiatorAction,
          b: secondInitiatorAction,
        });

        const productsService = {
          deleteProduct: jest.fn(() => cold(b)),
        } as any;

        const productsEffect = new ProductsEffect(actions$, productsService);

        expectObservable(productsEffect.deleteProduct$).toBe(c, {
          e: firstSuccessAction,
          f: secondSuccessAction,
        });

        flush();

        expect(productsService.deleteProduct).toHaveReturnedTimes(2);
        expect(productsService.deleteProduct).toHaveBeenCalledWith(
          firstActionPayload.productId
        );
      });
    });

    it('Should intercept deleteProduct action, try to delete a product and when error return deleteProductFail action with error message as payload', () => {
      testScheduler.run(({ hot, cold, expectObservable, flush }) => {
        const a = '-a';
        const b = '-#';
        const c = '--c';

        const initiatorPayload = { productId: '1' };
        const initiatorAction = deleteProduct({ payload: initiatorPayload });
        const failAction = deleteProductFail({ payload: errorMessage });

        const actions$ = hot(a, { a: initiatorAction });

        const productsService = {
          deleteProduct: jest.fn(() => cold(b, {}, { error: errorMessage })),
        } as any;

        const productsEffect = new ProductsEffect(actions$, productsService);

        expectObservable(productsEffect.deleteProduct$).toBe(c, {
          c: failAction,
        });

        flush();

        expect(productsService.deleteProduct).toHaveBeenCalledTimes(1);
        expect(productsService.deleteProduct).toHaveBeenCalledWith(
          initiatorPayload.productId
        );
      });
    });
  });
});
