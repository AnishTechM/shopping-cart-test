import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../shared/interfaces/products.interface';
import { CartService } from '../../../core/services/cart';
import { ProductService } from '../../../core/services/product';
import { ProductCard } from '../product-card/product-card';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  errorMessage = '';

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.products = response;
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = 'Not Loaded';
      },
    });
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
