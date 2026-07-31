import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart';

import { Product } from '../../interfaces/products.interface';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items: Product[]) => {
      this.cartItems = items;
    });
  }
}
