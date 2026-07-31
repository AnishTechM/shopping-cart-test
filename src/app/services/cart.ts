import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItems.asObservable();
  addToCart(product: Product): void {
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, product]);
  }
}
