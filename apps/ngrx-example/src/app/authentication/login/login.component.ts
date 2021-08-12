import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Authentication } from '../../data';

@Component({
  selector: 'examples-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  showPassword = false;

  readonly form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(50)],
    ],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  login(authentication: Authentication): void {
    console.log(authentication);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
