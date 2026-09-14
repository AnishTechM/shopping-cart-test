import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme';
import { CartService } from '../../../core/services/cart';
import { Product } from '../../interfaces/products.interface';
import { AuthService } from '../../../core/services/auth';
import { Button } from '../button/button';
import { SearchService } from '../../../core/services/search';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterLink, Button],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  private cartService = inject(CartService);
  private searchService = inject(SearchService);

  searchQuery = '';
  cartItems: Product[] = [];

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items: Product[]) => {
      this.cartItems = items;
    });
  }

  onSearchInput(value: string): void {
    this.searchService.setQuery(value);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchService.setQuery('');
  }

  logout(): void {
    this.authService.logout();
  }
}
