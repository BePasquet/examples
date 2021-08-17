import { createSelector } from '@ngrx/store';
import {
  selectOrders,
  selectOrdersError,
  selectOrdersLoaded,
  selectOrdersLoading,
  selectOrdersTotal,
} from '../../+state/orders.selectors';

export const selectOrdersVM = createSelector(
  selectOrders,
  selectOrdersLoading,
  selectOrdersLoaded,
  selectOrdersTotal,
  selectOrdersError,
  (orders, loading, loaded, total, error) => ({
    orders,
    loading,
    loaded,
    total,
    error,
  })
);
