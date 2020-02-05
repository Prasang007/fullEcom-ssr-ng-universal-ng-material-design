import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { User } from '../users';
import { Order } from '../orders';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':  'http://localhost:4200/',
    'Access-Control-Allow-Credentials': 'true',
    'Authorization': 'jwt-token'
  })
};
@Injectable()
export class SharedService {
  isAdmin = false;
  loggedIn = false;
  page: string;
  currentUser = new User();
  apiUrl = 'http://localhost:4000/api/';
  constructor( private http: HttpClient,
               private title: Title ) { }
  // ---------------------------------------PRODUCTS----------------------------------------------
  getProducts(): Observable<Product[]> {
    // const params = new HttpParams()
    // .set('category', category);
    return this.http.get<Product[]>(this.apiUrl + 'products');
  }
  getProductById(id: string): Observable<Product> {
    const params = new HttpParams()
    .set('id', id);
    return this.http.get<Product>(this.apiUrl + 'products/getProduct', {params});
  }

  // ---------------------------------------LOGIN AND SIGNUP----------------------------------------------
  login(loginCred): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'shared/login', loginCred, httpOptions);
  }

  emailCheck(email: string): Observable<boolean> {
    const params = new HttpParams()
    .set('email', email);
    // console.log(params);
    return this.http.get<boolean>(this.apiUrl + 'shared/signup', {params});
  }

  signUp(signupCred): Observable<User> {
    // console.log(signupCred);
    return this.http.post<User>(this.apiUrl + 'shared/signup', signupCred, httpOptions );
  }
  // ---------------------------------------SHARED RESOURCES----------------------------------------------
  setTitle(newTitle: string) {
    this.page = newTitle;
    this.title.setTitle(newTitle);
  }
  getPage() {
    return this.page;
  }
  checkAdmin() {
    return this.isAdmin;
  }
  // ---------------------------------------ORDERS----------------------------------------------
  placeOrder(order) {
    console.log(order);
    return this.http.post<string>(this.apiUrl + 'orders/create', order, httpOptions );
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + 'orders/getOrders');
  }
  getMyOrders(id: string): Observable<Order[]> {
    const params = new HttpParams()
    .set('userId', id);
    console.log(params);
    return this.http.get<Order[]>(this.apiUrl + 'orders/getMyOrders', {params});
  }
  changeStatus(order) {
    console.log(order);
    return this.http.put<string>(this.apiUrl + 'orders/changeStatus', order, httpOptions);
  }
  deleteOrder(id: string) {
    console.log(id);
    return this.http.delete(this.apiUrl + 'orders/' + id);
  }

  // ---------------------------------------USERS----------------------------------------------
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'users');
  }

}
