import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { ProductsPartialState } from '../../+state';
import {
  changeProductsPage,
  openDeleteConfirmationDialog,
  openProductDialog,
  openProductsComponent,
  searchProductByName,
  selectProductsVM,
  sortProducts,
} from './products.helper';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  readonly state$ = this.store.pipe(select(selectProductsVM));

  readonly pageIndex$ = new BehaviorSubject(0);

  constructor(private readonly store: Store<ProductsPartialState>) {
    this.store.dispatch(openProductsComponent());
  }

  searchProducts(name: string): void {
    this.pageIndex$.next(0);
    this.store.dispatch(searchProductByName({ payload: name }));
  }

  sort(ev: Sort): void {
    this.pageIndex$.next(0);
    this.store.dispatch(sortProducts({ payload: ev }));
  }

  changePage(ev: PageEvent): void {
    this.pageIndex$.next(ev.pageIndex);
    this.store.dispatch(changeProductsPage({ payload: ev }));
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
