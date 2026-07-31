import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = signal(
    this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    }),
  );

  login(): void {
    if (this.loginForm().invalid) return;

    // TODO: replace with real auth call (AuthService.login(...))
    console.log('Logging in with:', this.loginForm().value);

    this.router.navigate(['/products']);
  }
}
