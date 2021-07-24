import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { map, scan, shareReplay, startWith, tap } from 'rxjs/operators';
import { getProducts, ProductsPartialState } from '../../+state';
import {
  changeProductsPage,
  openDeleteConfirmationDialog,
  openProductDialog,
  ProductComponentEvents,
  productsFilterInitialState,
  productsFilterReducer,
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
export class ProductsComponent implements OnDestroy {
  readonly state$ = this.store.pipe(select(selectProductsVM));

  private readonly events$ = new Subject<ProductComponentEvents>();

  private readonly filter$ = this.events$.pipe(
    startWith(searchProductByName({ payload: '' })),
    scan(productsFilterReducer, productsFilterInitialState),
    shareReplay(1)
  );

  readonly pageIndex$ = this.filter$.pipe(
    map(({ offset, limit }) => offset / limit)
  );

  private readonly searchProducts$ = this.filter$.pipe(
    tap((payload) => this.store.dispatch(getProducts({ payload })))
  );

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<ProductsPartialState>) {
    this.subscriptions.add(this.searchProducts$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  searchProducts(name: string): void {
    this.events$.next(searchProductByName({ payload: name }));
  }

  sort(ev: Sort): void {
    this.events$.next(sortProducts({ payload: ev }));
  }

  changePage(ev: PageEvent): void {
    this.events$.next(changeProductsPage({ payload: ev }));
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
