import { EntitiesWithTotal, Product, ProductFilter } from '../data';

export const errorMessage = 'ERROR';

export const product: Product = {
  id: '1',
  name: 'Whey Protein',
  description: 'lorem ipsum',
  active: true,
  discount: 0,
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
    discount: 0,

    price: 50,
    rating: 5,
    stock: 100,
  },
  {
    id: '3',
    name: 'Protein Bar',
    description: 'lorem ipsum',
    active: true,
    discount: 0,

    price: 10,
    rating: 5,
    stock: 100,
  },
];

export const productsAPIResponse: EntitiesWithTotal<Product> = {
  results: products,
  total: products.length,
};

export const productFilter: ProductFilter = {
  name: '',
  limit: 10,
  offset: 0,
};
