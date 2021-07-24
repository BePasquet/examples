import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  createProduct,
  ProductsPartialState,
  updateProduct,
} from '../../+state';
import { Product } from '../../../data';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  readonly id = this.data?.id ?? '';

  readonly form = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(200)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4000),
      ],
    ],
    price: [
      0,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(Number.MAX_SAFE_INTEGER),
      ],
    ],
    stock: [
      1,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(Number.MAX_SAFE_INTEGER),
      ],
    ],
    active: [true, [Validators.required]],
    rating: [0, [Validators.required, Validators.max(5)]],
    discount: [0, [Validators.required, Validators.max(100)]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: Product,
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<ProductsPartialState>
  ) {
    if (!!this.data) {
      this.form.patchValue(this.data);
    }
  }

  submit({ id, name, description, ...entities }: Product): void {
    const product = {
      name: name.trim(),
      description: description.trim(),
      ...entities,
    };

    const action = !id
      ? createProduct({
          payload: product,
        })
      : updateProduct({ payload: { id, ...product } });

    this.store.dispatch(action);
  }
}
