import { SortDirection } from '@angular/material/sort';
import { Pagination } from './pagination.interface';

export interface ProductFilter extends Pagination {
  name: string;
  sort?: {
    key: string;
    direction: SortDirection;
  };
}
