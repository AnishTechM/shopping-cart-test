import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { ProductList } from './features/products/product-list/product-list';

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'login', component: Login },
];
