import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrdersEffect } from './+state/orders.effect';
import { ordersReducer, ORDERS_STATE_KEY } from './+state/orders.reducer';
import { OrdersComponent } from './containers/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
];

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature(ORDERS_STATE_KEY, ordersReducer),
    EffectsModule.forFeature([OrdersEffect]),
  ],
})
export class OrdersModule {}
