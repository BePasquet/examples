import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/ngrx-example/src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntitiesWithTotal, Product, ProductFilter } from '../../data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly resource = `${environment.API_URI}/products`;

  constructor(private readonly http: HttpClient) {}

  getProducts(filter: ProductFilter): Observable<EntitiesWithTotal<Product>> {
    // necessary for json-server
    const query = this.buildGetProductQuery(filter);
    return this.http.get<Product[]>(query, { observe: 'response' }).pipe(
      map((response) => ({
        results: response.body ?? [],
        total: parseInt(
          response.headers.get('X-Total-Count') ||
            response.body?.length.toString() ||
            '0',
          10
        ),
      }))
    );
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.resource}`, product);
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${this.resource}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.resource}/${id}`);
  }

  private buildGetProductQuery({
    name,
    limit,
    offset,
    sort,
  }: ProductFilter): string {
    const basQuery = `${this.resource}?_start=${offset}&_limit=${limit}`;
    const sortQuery = !!sort
      ? `&_sort=${sort.key}&_order=${sort.direction}`
      : '';
    const textQuery = !!name ? `&q=${name}` : '';

    return `${basQuery}${sortQuery}${textQuery}`;
  }
}
