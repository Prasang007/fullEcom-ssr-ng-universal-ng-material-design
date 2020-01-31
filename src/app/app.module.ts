import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { SharedService } from './shared/shared.service';
import { FilterPipe } from './filter.pipe';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { UsersInfoComponent } from './components/admin/users-info/users-info.component';
import { ManageOrdersComponent } from './components/admin/manage-orders/manage-orders.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavComponent,
    FilterPipe,
    ProductDetailsComponent,
    LoginComponent,
    UsersInfoComponent,
    ManageOrdersComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [

  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
