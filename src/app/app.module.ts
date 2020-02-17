import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

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
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { OrderStatusComponent } from './components/admin/order-status/order-status.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import { LoaderInterceptor } from './shared/loader.intercepter';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { VerfiyEmailComponent } from './components/verfiy-email/verfiy-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ErrorNotfoundComponent } from './components/error-notfound/error-notfound.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1045310318871-vif3cu83ignh6iun1o63ol48kh8me77r.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('188131179218619')
  }
]);

export function provideConfig() {
  return config;
}

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
    AddProductComponent,
    OrderStatusComponent,
    CartComponent,
    OrderDetailsComponent,
    UserDetailsComponent,
    ManageAccountComponent,
    VerfiyEmailComponent,
    ForgotPasswordComponent,
    ErrorNotfoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgtUniversalModule,
    SharedModule
  ],
  exports: [

  ],
  providers: [SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
