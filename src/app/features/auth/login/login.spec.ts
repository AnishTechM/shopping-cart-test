import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validity', () => {
    it('should be invalid when empty', () => {
      expect(component.loginForm().invalid()).toBe(true);
    });

    it('should be invalid with a malformed email', () => {
      component.loginModel.set({ email: 'not-an-email', password: '1234' });
      fixture.detectChanges();

      expect(component.loginForm.email().invalid()).toBe(true);
    });

    it('should be invalid with a password under 4 characters', () => {
      component.loginModel.set({ email: 'a@b.com', password: '123' });
      fixture.detectChanges();

      expect(component.loginForm.password().invalid()).toBe(true);
    });

    it('should be valid with a proper email and long-enough password', () => {
      component.loginModel.set({ email: 'a@b.com', password: '1234' });
      fixture.detectChanges();

      expect(component.loginForm().valid()).toBe(true);
    });
  });

  describe('error messages', () => {
    it('should expose a required error on the untouched email field', () => {
      const errors = component.loginForm.email().errors();
      expect(errors.some((e) => e.message === 'Email is required')).toBe(true);
    });

    it('should expose an email-format error for an invalid email', () => {
      component.loginModel.set({ email: 'bad-email', password: '' });
      fixture.detectChanges();

      const errors = component.loginForm.email().errors();
      expect(errors.some((e) => e.message === 'Please enter valid email')).toBe(true);
    });
  });

  describe('login()', () => {
    it('should NOT navigate when the form is invalid', () => {
      component.loginModel.set({ email: '', password: '' });
      fixture.detectChanges();

      component.login();

      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to / when the form is valid', () => {
      component.loginModel.set({ email: 'a@b.com', password: '1234' });
      fixture.detectChanges();

      component.login();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('DOM interaction', () => {
    it('should disable the submit button while the form is invalid', () => {
      const button: HTMLButtonElement =
        fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBe(true);
    });

    it('should enable the submit button once the form becomes valid', () => {
      component.loginModel.set({ email: 'a@b.com', password: '1234' });
      fixture.detectChanges();

      const button: HTMLButtonElement =
        fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBe(false);
    });
  });
});
