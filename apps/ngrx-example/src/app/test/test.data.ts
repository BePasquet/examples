import { Product } from '../data';

export const errorMessage = 'ERROR';

export const product: Product = {
  id: '1',
  name: 'Whey Protein',
  description: 'lorem ipsum',
  active: true,
  categoryId: '1',
  discount: 0,
  images: [],
  price: 100,
  rating: 5,
  stock: 100,
};

export const products: Product[] = [
  product,
  {
    id: '2',
    name: 'Fat Burner',
    description: 'lorem ipsum',
    active: true,
    categoryId: '1',
    discount: 0,
    images: [],
    price: 50,
    rating: 5,
    stock: 100,
  },
  {
    id: '3',
    name: 'Protein Bar',
    description: 'lorem ipsum',
    active: true,
    categoryId: '1',
    discount: 0,
    images: [],
    price: 10,
    rating: 5,
    stock: 100,
  },
];
