import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/interfaces/products.interface';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-product-card',
  imports: [Button],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
  addToCart = output<Product>();

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }
}
