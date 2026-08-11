import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard } from './product-card';
import { Product } from '../../../shared/interfaces/products.interface';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  const mockProduct: Product = { id: 1, title: 'Sneakers', price: 50, image: 'sneakers.jpg' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the product title and price', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Sneakers');
    expect(compiled.querySelector('p')?.textContent).toContain('50');
  });

  it('should emit addToCart with the product when the button is clicked', () => {
    spyOn(component.addToCart, 'emit');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    button.click();

    expect(component.addToCart.emit).toHaveBeenCalledWith(mockProduct);
  });
});
