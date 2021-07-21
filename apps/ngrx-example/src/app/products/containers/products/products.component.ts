import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
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
export class ProductsComponent implements OnDestroy {
  readonly state$ = this.store.pipe(select(selectProductsVM));

  readonly searchInput$ = new Subject<string>();

  private readonly searchProducts$ = this.searchInput$.pipe(
    debounceTime(350),
    distinctUntilChanged(),
    map((name) => searchProducts({ payload: { name } })),
    tap((action) => this.store.dispatch(action))
  );

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<ProductsPartialState>) {}

  ngOnInit(): void {
    this.store.dispatch(searchProducts({ payload: { name: '' } }));
    this.subscriptions.add(this.searchProducts$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
