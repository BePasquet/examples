import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Product } from '../../../data';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {
  @Input()
  products: Product[] = [];

  @Input()
  total: number = 0;

  @Input()
  pageIndex: number = 0;

  @Output()
  deleteProduct = new EventEmitter<Product>();

  @Output()
  editProduct = new EventEmitter<Product>();

  @Output()
  changePage = new EventEmitter<PageEvent>();

  readonly displayedColumns = [
    'name',
    'description',
    'price',
    'stock',
    'active',
    'rating',
    'discount',
    'actions',
  ];
}
