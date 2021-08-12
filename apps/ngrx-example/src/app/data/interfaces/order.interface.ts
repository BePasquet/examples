import { OrderStatus } from '../enum/order-status.enum';
import { CartItem } from './cart-item.interface';
import { User } from './user.interface';

export interface Order {
  id: string;
  status: OrderStatus;
  user: User;
  detail: (CartItem & { reviewed: boolean })[];
  total: number;
  slip: string | null;
  createdAt: number;
}
