import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../../../data';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {
  @Input()
  products: Product[] = [];

  @Output()
  deleteProduct = new EventEmitter<Product>();

  @Output()
  editProduct = new EventEmitter<Product>();

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
