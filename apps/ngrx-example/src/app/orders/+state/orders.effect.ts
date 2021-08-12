import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { OrdersService } from '../services/orders.service';
import {
  getOrders,
  getOrdersFail,
  getOrdersSuccess,
  updateOrdersStatus,
  updateOrderStatusFail,
  updateOrderStatusSuccess,
} from './orders.actions';

@Injectable()
export class OrdersEffect {
  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrders),
      switchMap(({ payload }) =>
        this.ordersService.getOrders(payload).pipe(
          map((response) => getOrdersSuccess({ payload: response })),
          catchError(({ error }) => of(getOrdersFail({ payload: error })))
        )
      )
    )
  );

  updateOrderStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrdersStatus),
      concatMap(({ payload }) =>
        this.ordersService.updateOrderStatus(payload).pipe(
          map(() => updateOrderStatusSuccess({ payload })),
          catchError(({ error }) =>
            of(updateOrderStatusFail({ payload: error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly ordersService: OrdersService
  ) {}
}
