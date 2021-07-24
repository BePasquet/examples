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
  private readonly endpoint = `${environment.API_URI}/products`;

  constructor(private readonly http: HttpClient) {}

  getProducts(filter: ProductFilter): Observable<EntitiesWithTotal<Product>> {
    const query = this.buildGetProductQuery(filter);
    return this.http.get<Product[]>(query, { observe: 'response' }).pipe(
      map((response) => ({
        results: response.body ?? [],
        total: parseInt(response.headers.get('X-Total-Count') ?? '', 10),
      }))
    );
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.endpoint}`, product);
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${this.endpoint}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  private buildGetProductQuery({ name, limit, offset }: ProductFilter): string {
    const query = `${this.endpoint}?_start=${offset}&_limit=${limit}`;
    return !!name ? `${query}&q=${name}` : query;
  }
}
