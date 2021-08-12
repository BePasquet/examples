import { CartItemProduct } from './cart-item-product.type';

export interface CartItem {
  id: string;
  quantity: number;
  product: CartItemProduct;
}
