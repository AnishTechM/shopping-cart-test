import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';
import { Product } from '../../../shared/interfaces/products.interface';
import { CartService } from '../../../core/services/cart';
import { ProductService } from '../../../core/services/product';
import { AuthService } from '../../../core/services/auth';
import { SearchService } from '../../../core/services/search';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  errorMessage = '';

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private searchService = inject(SearchService);
  private router = inject(Router);

  ngOnInit(): void {
    combineLatest([
      this.productService.getProducts(),
      this.searchService.searchQuery$.pipe(debounceTime(200), distinctUntilChanged()),
    ]).subscribe({
      next: ([products, query]) => {
        this.products = products;
        this.filteredProducts = this.filterProducts(products, query);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = 'Not Loaded';
      },
    });
  }

  private filterProducts(products: Product[], query: string): Product[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;

    return products.filter((product) => product.title.toLowerCase().includes(normalized));
  }

  addToCart(product: Product): void {
    if (!this.authService.isLoggedIn()) {
      this.cartService.setPendingProduct(product);
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(product);
  }
}
