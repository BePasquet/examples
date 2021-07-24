import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/ngrx-example/src/environments/environment';
import { Observable } from 'rxjs';
import { Product, ProductFilter } from '../../data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly endpoint = `${environment.API_URI}/products`;

  constructor(private readonly http: HttpClient) {}

  getProducts({ name }: ProductFilter): Observable<Product[]> {
    const query = !!name ? `${this.endpoint}?q=${name}` : this.endpoint;
    return this.http.get<Product[]>(query);
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
}
