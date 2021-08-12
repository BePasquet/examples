import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/ngrx-example/src/environments/environment';
import { Observable } from 'rxjs';
import {
  EntitiesWithTotal,
  Order,
  OrderFilter,
  UpdateOrderStatus,
} from '../../data';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly resource = `${environment.API_URI}/orders`;

  constructor(private readonly http: HttpClient) {}

  getOrders(criteria: OrderFilter): Observable<EntitiesWithTotal<Order>> {
    return this.http.post<EntitiesWithTotal<Order>>(
      `${this.resource}`,
      criteria
    );
  }

  updateOrderStatus(update: UpdateOrderStatus): Observable<void> {
    return this.http.post<void>(`${this.resource}/update-status`, update);
  }
}
