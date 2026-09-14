import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Navbar } from './navbar';
import { ThemeService } from '../../../core/services/theme';
import { CartService } from '../../../core/services/cart';
import { AuthService } from '../../../core/services/auth';
import { Product } from '../../interfaces/products.interface';
import { SearchService } from '../../../core/services/search';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let themeServiceStub: {
    theme: ReturnType<typeof signal<'light' | 'dark'>>;
    toggleTheme: jasmine.Spy;
  };
  let authServiceStub: {
    isLoggedIn: ReturnType<typeof signal<boolean>>;
    logout: jasmine.Spy;
  };
  let cartItemsSubject: BehaviorSubject<Product[]>;
  let cartServiceStub: { cartItems$: typeof cartItemsSubject };

  beforeEach(async () => {
    themeServiceStub = {
      theme: signal<'light' | 'dark'>('light'),
      toggleTheme: jasmine.createSpy('toggleTheme'),
    };

    authServiceStub = {
      isLoggedIn: signal(true), // logged in by default so cart UI renders
      logout: jasmine.createSpy('logout'),
    };

    cartItemsSubject = new BehaviorSubject<Product[]>([]);
    cartServiceStub = { cartItems$: cartItemsSubject };

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([]),
        { provide: ThemeService, useValue: themeServiceStub },
        { provide: CartService, useValue: cartServiceStub },
        { provide: AuthService, useValue: authServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cart count (logged in)', () => {
    it('should show 0 initially', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.cart-count')?.textContent).toContain('0');
    });

    it('should update when the cart service emits new items', () => {
      const product: Product = { id: 1, title: 'Sneakers', price: 50, image: 'sneakers.jpg' };
      cartItemsSubject.next([product]);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.cart-count')?.textContent).toContain('1');
    });
  });

  describe('logged out state', () => {
    it('should hide the cart icon and show Log In / Sign Up', () => {
      authServiceStub.isLoggedIn.set(false);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.cart-link')).toBeNull();
      expect(compiled.textContent).toContain('Log In');
      expect(compiled.textContent).toContain('Sign Up');
    });
  });

  describe('logout', () => {
    it('should call authService.logout when clicked', () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('.btn--outline');
      button.click();
      expect(authServiceStub.logout).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    let searchServiceMock: any;

    beforeEach(() => {
      // Inject the search service from our testing configuration to track spy calls
      searchServiceMock = TestBed.inject(SearchService);
      spyOn(searchServiceMock, 'setQuery');
    });

    it('should update the search service query when input changes', () => {
      const searchString = 'shoes';
      component.onSearchInput(searchString);

      // Asserts that your component successfully delegates the keyword to your SearchService
      expect(searchServiceMock.setQuery).toHaveBeenCalledWith(searchString);
    });

    it('should clear the search input string and reset the search service state', () => {
      component.searchQuery = 'jacket';
      component.clearSearch();

      expect(component.searchQuery).toBe('');
      expect(searchServiceMock.setQuery).toHaveBeenCalledWith('');
    });
  });

  describe('theme toggle', () => {
    it('should call toggleTheme when clicked', () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('.theme-toggle');
      button.click();
      expect(themeServiceStub.toggleTheme).toHaveBeenCalled();
    });
  });
});
