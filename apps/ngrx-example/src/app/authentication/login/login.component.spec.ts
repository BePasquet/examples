import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { login } from '../+state';
import { LoginComponent } from './login.component';

let formBuilder: FormBuilder;
let mockStore: MockStore;
let fixture: ComponentFixture<LoginComponent>;
let component: LoginComponent;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [LoginComponent],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      BrowserAnimationsModule,
    ],
    providers: [provideMockStore({})],
  }).compileComponents();

  formBuilder = TestBed.inject(FormBuilder);
  mockStore = TestBed.inject(MockStore);
  fixture = TestBed.createComponent(LoginComponent);
  component = fixture.componentInstance;
});

describe('LoginComponent', () => {
  it('Should create a login component', () => {
    expect(component).toBeDefined();
  });

  it('Should have a login form with email and password fields and a login button', () => {
    const debugElement = fixture.debugElement;
    const form = debugElement.query(By.css('form'));

    const emailInput = debugElement.query(By.css('.email-container input'));

    const passwordInput = debugElement.query(
      By.css('.password-container input')
    );

    const loginButton = debugElement.query(
      By.css('.login-button-container button')
    );

    expect(form).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(loginButton).toBeDefined();
  });

  it('Should have login button disabled when form is invalid', () => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;

    const authentication = {
      email: 'pedro',
      password: '',
    };

    component.form.setValue(authentication);
    fixture.detectChanges();

    const loginButton = debugElement.query(
      By.css('.login-button-container > button')
    )?.nativeElement;

    expect(loginButton?.disabled).toBe(true);
  });

  it('Should have login button enabled when form is valid', () => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;

    const authentication = {
      email: 'pedro@gmail.com',
      password: '1234567',
    };

    component.form.setValue(authentication);
    fixture.detectChanges();

    const loginButton = debugElement.query(
      By.css('.login-button-container > button')
    )?.nativeElement;

    expect(loginButton?.disabled).toBe(false);
  });

  it('Should show errors when inputs are invalid', () => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;

    const authentication = {
      email: 'pedro',
      password: '',
    };

    component.form.setValue(authentication);
    component.form.get('email')?.markAsTouched();
    component.form.get('password')?.markAsTouched();

    fixture.detectChanges();

    const emailError = debugElement.query(
      By.css('.email-container mat-error p')
    );

    const passwordError = debugElement.query(
      By.css('.password-container mat-error p')
    );

    expect(emailError).toBeDefined();
    expect(passwordError).toBeDefined();
  });

  describe('togglePassword method', () => {
    it('Should toggle showPassword flag', () => {
      expect(component.showPassword).toBe(false);

      component.togglePassword();

      expect(component.showPassword).toBe(true);
    });
  });

  describe('login method', () => {
    it('Should call store dispatch with login action with form value as payload', () => {
      // space on email is on purpose to check trim
      const authentication = {
        email: 'pedro@gmail.com ',
        password: '1234567',
      };

      component.form.patchValue(authentication, {});

      const loginAction = login({
        payload: {
          email: authentication.email.trim(),
          password: authentication.password,
        },
      });

      const loginSpy = jest.spyOn(component, 'login');
      const storeSpy = jest.spyOn(mockStore, 'dispatch');

      component.login(component.form.value);

      expect(loginSpy).toHaveBeenCalledWith(component.form.value);
      expect(storeSpy).toHaveBeenCalledWith(loginAction);
    });
  });
});
