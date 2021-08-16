import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './containers/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('../products/products.module').then(
            (ref) => ref.ProductsModule
          ),
      },
      { path: '', pathMatch: 'full', redirectTo: 'products' },
    ],
  },
];
@NgModule({
  declarations: [AdminComponent],
  imports: [RouterModule.forChild(routes), CommonModule, MatSidenavModule],
})
export class AdminModule {}
