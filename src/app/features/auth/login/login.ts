import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';
import { CartService } from '../../../core/services/cart';
import { AuthService } from '../../../core/services/auth';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-login',
  imports: [FormField, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Please enter valid email' });

    required(path.password, { message: 'Password is required' });
    minLength(path.password, 4, { message: 'Password must be at least 4 characters' });
  });

  login(): void {
    if (this.loginForm().invalid()) return;

    // TODO: replace with real auth call (AuthService.login(credentials))
    console.log('Logging in with:', this.loginModel());

    this.authService.login();

    const pendingProduct = this.cartService.consumePendingProduct();
    if (pendingProduct) {
      this.cartService.addToCart(pendingProduct);
    }

    this.router.navigate(['/']);
  }
}
