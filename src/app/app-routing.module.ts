import { ManageOrdersComponent } from './components/admin/manage-orders/manage-orders.component';
import { UsersInfoComponent } from './components/admin/users-info/users-info.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'users', component: UsersInfoComponent},
  {path: 'manage/orders', component: ManageOrdersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: '', redirectTo: '/users', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
