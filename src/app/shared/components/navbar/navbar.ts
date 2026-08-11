import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme';
import { CartService } from '../../../core/services/cart';
import { Product } from '../../interfaces/products.interface';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  private cartService = inject(CartService);

  searchQuery = '';
  cartItems: Product[] = [];

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items: Product[]) => {
      this.cartItems = items;
    });
  }

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      console.log('Searching for:', query);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
