import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { ProductList } from './product-list';
import { ProductService } from '../../../core/services/product';
import { CartService } from '../../../core/services/cart';
import { AuthService } from '../../../core/services/auth';
import { Product } from '../../../shared/interfaces/products.interface';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let authServiceStub: { isLoggedIn: jasmine.Spy };
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProducts: Product[] = [
    { id: 1, title: 'Sneakers', price: 50, image: 'sneakers.jpg' },
    { id: 2, title: 'Jacket', price: 120, image: 'jacket.jpg' },
  ];

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart', 'setPendingProduct']);
    authServiceStub = { isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(true) };
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  function createComponent() {
    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
  }

  it('should create', () => {
    productServiceSpy.getProducts.and.returnValue(of([]));
    createComponent();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('fetching products', () => {
    it('should populate products on successful load', () => {
      productServiceSpy.getProducts.and.returnValue(of(mockProducts));
      createComponent();
      fixture.detectChanges();

      expect(component.products.length).toBe(2);
      expect(component.products).toEqual(mockProducts);
    });

    it('should render a card for each product', () => {
      productServiceSpy.getProducts.and.returnValue(of(mockProducts));
      createComponent();
      fixture.detectChanges();

      const titles: HTMLElement[] = fixture.nativeElement.querySelectorAll('h3');
      expect(titles.length).toBe(2);
      expect(titles[0].textContent).toContain('Sneakers');
      expect(titles[1].textContent).toContain('Jacket');
    });

    it('should render the price for each product', () => {
      productServiceSpy.getProducts.and.returnValue(of(mockProducts));
      createComponent();
      fixture.detectChanges();

      const prices: HTMLElement[] = fixture.nativeElement.querySelectorAll('p');
      expect(prices[0].textContent).toContain('50');
      expect(prices[1].textContent).toContain('120');
    });

    it('should set errorMessage when the request fails', () => {
      productServiceSpy.getProducts.and.returnValue(throwError(() => new Error('Network error')));
      createComponent();
      fixture.detectChanges();

      expect(component.errorMessage).toBe('Not Loaded');
      expect(component.products.length).toBe(0);

      const errorEl: HTMLElement | null =
        fixture.nativeElement.querySelector('.product-list__error');
      expect(errorEl?.textContent).toContain('Not Loaded');
    });
  });

  describe('addToCart (logged in)', () => {
    beforeEach(() => {
      productServiceSpy.getProducts.and.returnValue(of(mockProducts));
      createComponent();
      fixture.detectChanges();
    });

    it('should call cartService.addToCart with the correct product', () => {
      component.addToCart(mockProducts[0]);

      expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(mockProducts[0]);
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should call addToCart when the button is clicked', () => {
      spyOn(component, 'addToCart');
      const buttons: HTMLButtonElement[] = fixture.nativeElement.querySelectorAll('button');

      buttons[0].click();

      expect(component.addToCart).toHaveBeenCalledWith(mockProducts[0]);
    });
  });

  describe('addToCart (logged out)', () => {
    beforeEach(() => {
      authServiceStub.isLoggedIn.and.returnValue(false);
      productServiceSpy.getProducts.and.returnValue(of(mockProducts));
      createComponent();
      fixture.detectChanges();
    });

    it('should store the pending product and redirect to /login instead of adding to cart', () => {
      component.addToCart(mockProducts[0]);

      expect(cartServiceSpy.setPendingProduct).toHaveBeenCalledWith(mockProducts[0]);
      expect(cartServiceSpy.addToCart).not.toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
