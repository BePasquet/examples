import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Link } from '../../interfaces/link.interface';

@Component({
  selector: 'sidenav',
  template: `
    <div>somelogo</div>

    <div class="links-container">
      <a
        *ngFor="let link of links"
        mat-button
        [routerLink]="[link.url]"
        routerLinkActive="active"
      >
        <mat-icon>{{ link.icon }}</mat-icon>
        <span>{{ link.name }}</span>
      </a>
    </div>
  `,
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Input()
  links: Link[] = [];
}
