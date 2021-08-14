import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationProvider } from './authentication';

@Component({
  selector: 'examples-root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private readonly authenticationProvider: AuthenticationProvider) {
    this.authenticationProvider.checkAuthentication();
  }
}
