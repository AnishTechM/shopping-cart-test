import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../interfaces/products.interface';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-single-product',
  imports: [],
  templateUrl: './single-product.html',
  styleUrl: './single-product.css',
})
export class SingleProduct implements OnInit {
  products: Product[] = [];
  cartItems: Product[] = [];
  private cartService = inject(CartService);
  errorMessage = '';
  constructor(private productService: ProductService) {}
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
    this.cartService.addToCart(product);
  }
}
