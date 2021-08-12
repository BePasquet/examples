import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ordersAdapter, OrdersState, ORDERS_STATE_KEY } from './orders.reducer';

const { selectAll } = ordersAdapter.getSelectors();

export const selectOrdersState =
  createFeatureSelector<OrdersState>(ORDERS_STATE_KEY);

export const selectOrders = createSelector(selectOrdersState, selectAll);

export const selectOrdersLoading = createSelector(
  selectOrdersState,
  ({ loading }) => loading
);

export const selectOrdersLoaded = createSelector(
  selectOrdersState,
  ({ loaded }) => loaded
);

export const selectOrdersTotal = createSelector(
  selectOrdersState,
  ({ total }) => total
);

export const selectOrdersError = createSelector(
  selectOrdersState,
  ({ error }) => error
);
