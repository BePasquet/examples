import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OrdersPartialState } from '../../+state/orders.reducer';
import { selectOrdersVM } from './orders.helper';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  readonly state$ = this.store.pipe(select(selectOrdersVM));

  constructor(private readonly store: Store<OrdersPartialState>) {}
}
