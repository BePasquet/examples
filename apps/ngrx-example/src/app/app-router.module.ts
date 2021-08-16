import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonAuthenticatedGuard } from './authentication';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./admin/admin.module').then((ref) => ref.AdminModule),
  },
  {
    canActivate: [NonAuthenticatedGuard],
    path: 'login',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (ref) => ref.AuthenticationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
