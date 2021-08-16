import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SIDENAV_LINKS } from '../const/sidenav-links.const';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  readonly sidenavLinks = SIDENAV_LINKS;
}
