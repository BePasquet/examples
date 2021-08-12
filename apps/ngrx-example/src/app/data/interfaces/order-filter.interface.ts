import { SortDirection } from '@angular/material/sort';
import { Pagination } from './pagination.interface';

export interface OrderFilter extends Pagination {
  sort?: {
    key: string;
    direction: SortDirection;
  };
}
