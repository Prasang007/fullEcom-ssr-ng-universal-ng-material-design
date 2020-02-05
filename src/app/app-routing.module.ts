import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { OrderStatusComponent } from './components/admin/order-status/order-status.component';
import { OrderComponent } from './shared/order/order.component';
import { LoginInGuard } from './shared/login.guard';
import { ManageOrdersComponent } from './components/admin/manage-orders/manage-orders.component';
import { UsersInfoComponent } from './components/admin/users-info/users-info.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminGuard } from './shared/admin.guard';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'products', component: ProductsComponent, canActivate: [LoginInGuard] },
  {path: 'orders', component: OrderComponent, canActivate: [LoginInGuard]},
  {path: 'cart', component: CartComponent, canActivate: [LoginInGuard]},
  {path: 'products/:id', component: ProductDetailsComponent, canActivate: [LoginInGuard]},
  {path: 'users', component: UsersInfoComponent, canActivate: [ AdminGuard]},
  {path: 'users/:id', component:  UserDetailsComponent, canActivate: [ AdminGuard]},
  {path: 'manage/orders', component: ManageOrdersComponent, canActivate: [ AdminGuard] },
  {path: 'order-status', component: OrderStatusComponent, canActivate: [ AdminGuard] },
  {path: 'add-product', component: AddProductComponent , canActivate: [ AdminGuard] },
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
