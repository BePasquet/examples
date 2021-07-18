import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsEffect, productsReducer, PRODUCTS_STATE_KEY } from './+state';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature(PRODUCTS_STATE_KEY, productsReducer),
    EffectsModule.forFeature([ProductsEffect]),
  ],
  declarations: [ProductsComponent],
})
export class ProductsModule {}
