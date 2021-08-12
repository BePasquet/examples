import { createAction, props } from '@ngrx/store';
import {
  EntitiesWithTotal,
  Order,
  OrderFilter,
  UpdateOrderStatus,
} from '../../data';

export const getOrders = createAction(
  '[Orders] Get Orders',
  props<{ payload: OrderFilter }>()
);

export const getOrdersSuccess = createAction(
  '[Orders] Get Orders Success',
  props<{ payload: EntitiesWithTotal<Order> }>()
);

export const getOrdersFail = createAction(
  '[Orders] Get Orders Fail',
  props<{ payload: string }>()
);

export const updateOrdersStatus = createAction(
  '[Order] Update Order Status',
  props<{ payload: UpdateOrderStatus }>()
);

export const updateOrderStatusSuccess = createAction(
  '[Order] Update Order Status Success',
  props<{ payload: UpdateOrderStatus }>()
);

export const updateOrderStatusFail = createAction(
  '[Order] Update Order Status Fail',
  props<{ payload: string }>()
);

export type OrdersActions = ReturnType<
  typeof getOrders | typeof getOrdersSuccess | typeof getOrdersFail
>;
