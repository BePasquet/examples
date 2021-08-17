import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.componen';
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
      {
        path: 'orders',
        loadChildren: () =>
          import('../orders/orders.module').then((ref) => ref.OrdersModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'products' },
    ],
  },
];
@NgModule({
  declarations: [AdminComponent, SidenavComponent, ToolbarComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AdminModule {}
