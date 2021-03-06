import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { ProductsEffect, productsReducer, PRODUCTS_STATE_KEY } from './+state';
import {
  ProductCategoriesEffect,
  productsCategoriesReducer,
  PRODUCT_CATEGORIES_STATE_KEY,
} from './+state/product-categories';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductsComponentEffect } from './containers/products/products-component.effect';
import { ProductsComponent } from './containers/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(PRODUCTS_STATE_KEY, productsReducer),
    StoreModule.forFeature(
      PRODUCT_CATEGORIES_STATE_KEY,
      productsCategoriesReducer
    ),
    EffectsModule.forFeature([
      ProductsEffect,
      ProductsComponentEffect,
      ProductCategoriesEffect,
    ]),
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    ProductsComponent,
    ProductsTableComponent,
    ProductFormComponent,
  ],
})
export class ProductsModule {}
