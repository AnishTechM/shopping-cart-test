import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { SingleProduct } from './components/single-product/single-product';

export const routes: Routes = [
  { path: '', component: SingleProduct }, // temporary — see note below
  { path: 'login', component: Login },
  { path: 'products', component: SingleProduct },
];
