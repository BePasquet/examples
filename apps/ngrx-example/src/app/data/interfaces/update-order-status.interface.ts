import { OrderStatus } from '../enum/order-status.enum';

export interface UpdateOrderStatus {
  id: string;
  status: OrderStatus;
}
