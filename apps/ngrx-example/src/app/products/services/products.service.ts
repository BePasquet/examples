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

  getProducts(criteria: ProductFilter): Observable<Product[]> {
    return this.http.post<Product[]>(this.endpoint, criteria);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.endpoint}/create`, product);
  }

  updateProduct(product: Omit<Product, 'id'>): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/update`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/delete/${id}`);
  }
}
