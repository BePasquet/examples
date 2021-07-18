export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  stock: number;
  images: string[];
  active: boolean;
  rating: number;
  discount: number;
}
