import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, switchMap, take, tap } from 'rxjs';
import { AuthenticationProvider } from './authentication';
import { showMessage } from './layout';

@Component({
  selector: 'examples-root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly reloadWhenSWUpdate$ = this.swUpdate.available.pipe(
    switchMap(() => this.swUpdate.activateUpdate()),
    tap(() => location.reload()),
    catchError(() => EMPTY),
    take(1)
  );

  private readonly showErrorWhenUnrecoverable$ =
    this.swUpdate.unrecoverable.pipe(
      tap(() =>
        this.store.dispatch(
          showMessage({
            payload: `An error has ocurred please reload the page`,
          })
        )
      ),
      take(1)
    );

  constructor(
    private readonly authenticationProvider: AuthenticationProvider,
    private readonly swUpdate: SwUpdate,
    private readonly store: Store
  ) {
    this.authenticationProvider.checkAuthentication();
    this.reloadWhenSWUpdate$.subscribe();
    this.showErrorWhenUnrecoverable$.subscribe();
  }
}
