import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Order } from '../../data';
import {
  getOrders,
  getOrdersFail,
  getOrdersSuccess,
  OrdersActions,
  updateOrdersStatus,
  updateOrderStatusFail,
  updateOrderStatusSuccess,
} from './orders.actions';

export const ORDERS_STATE_KEY = 'orders';

export interface OrdersState extends EntityState<Order> {
  loading: boolean;
  loaded: boolean;
  total: number;
  error: string;
}

export interface OrdersPartialState {
  [ORDERS_STATE_KEY]: OrdersState;
}

export const ordersAdapter = createEntityAdapter<Order>();

export const ordersInitialState = ordersAdapter.getInitialState({
  loading: false,
  loaded: false,
  total: 0,
  error: '',
});

const reducer = createReducer(
  ordersInitialState,
  on(getOrders, (state) =>
    ordersAdapter.removeAll({
      ...state,
      loading: true,
      loaded: false,
      total: 0,
      error: '',
    })
  ),
  on(getOrdersSuccess, (state, { payload: { results, total } }) =>
    ordersAdapter.setAll(results, {
      ...state,
      loading: false,
      loaded: true,
      total,
      error: '',
    })
  ),
  on(getOrdersFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),
  on(updateOrdersStatus, (state) => ({ ...state, loading: true, error: '' })),
  on(updateOrderStatusSuccess, (state, { payload: { id, status } }) =>
    ordersAdapter.updateOne(
      { id, changes: { status } },
      { ...state, loading: false, error: '' }
    )
  ),
  on(updateOrderStatusFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }))
);

export function ordersReducer(
  state: OrdersState,
  action: OrdersActions
): OrdersState {
  return reducer(state, action);
}
