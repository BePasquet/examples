import { Product } from './product.interface';

export type CartItemProduct = Pick<
  Product,
  'id' | 'name' | 'price' | 'discount' | 'rating' | 'discount'
>;
