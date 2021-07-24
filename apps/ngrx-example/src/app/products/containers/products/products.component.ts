import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProductsPartialState } from '../../+state';
import {
  openDeleteConfirmationDialog,
  openProductDialog,
  searchProducts,
  selectProductsVM,
} from './products.helper';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  readonly state$ = this.store.pipe(select(selectProductsVM));

  constructor(private readonly store: Store<ProductsPartialState>) {}

  ngOnInit(): void {
    this.searchProducts('');
  }

  searchProducts(name: string): void {
    this.store.dispatch(searchProducts({ payload: { name } }));
  }

  openProductDialog(productId: string): void {
    this.store.dispatch(openProductDialog({ payload: { productId } }));
  }

  confirmDelete(productId: string): void {
    this.store.dispatch(
      openDeleteConfirmationDialog({ payload: { productId } })
    );
  }
}
