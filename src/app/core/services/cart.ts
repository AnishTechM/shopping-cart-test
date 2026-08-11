import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private pendingProduct: Product | null = null;

  addToCart(product: Product): void {
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, product]);
  }

  setPendingProduct(product: Product): void {
    this.pendingProduct = product;
  }

  consumePendingProduct(): Product | null {
    const product = this.pendingProduct;
    this.pendingProduct = null;
    return product;
  }
}
