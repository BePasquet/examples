import { TestScheduler } from 'rxjs/testing';
import { OrderStatus } from '../../data/enum/order-status.enum';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('getOrders', () => {
    it('should send http post request to get orders from server', () => {
      testScheduler.run(({ cold, expectObservable, flush }) => {
        const response = { results: [], total: 0 };
        const a = '-a|';

        const mockHttpClient = {
          post: jest.fn(() => cold(a, { a: response })),
        } as any;

        const ordersService = new OrdersService(mockHttpClient);

        const args = { limit: 10, offset: 0 };
        const response$ = ordersService.getOrders(args);

        expectObservable(response$).toBe(a, { a: response });

        flush();

        expect(mockHttpClient.post).toHaveBeenCalled();
      });
    });
  });

  describe('updateOrderStatus', () => {
    it('should send http post request to change an order status', () => {
      testScheduler.run(({ cold, expectObservable, flush }) => {
        const a = '-a|';
        let response = void 0;

        const mockHttpClient = {
          post: jest.fn(() => cold(a, { a: response })),
        } as any;

        const ordersService = new OrdersService(mockHttpClient);

        const response$ = ordersService.updateOrderStatus({
          id: '1',
          status: OrderStatus.Approved,
        });

        expectObservable(response$).toBe(a, { a: response });
        flush();

        expect(mockHttpClient.post).toHaveBeenCalled();
      });
    });
  });
});
