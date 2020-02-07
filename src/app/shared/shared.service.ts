import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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
    Authorization: 'jwt-token'
  })
};
@Injectable()
export class SharedService {
  isAdmin = false;
  loggedIn = false;
  isLoading = new BehaviorSubject(false);
  isSocial = false;
  notifications: {_id, order: Order, status}[] = [];
  unreadNotifs = 0;
  page: string;
  currentUser = new User();
  apiUrl = 'http://localhost:4000/api/';
  constructor( private http: HttpClient,
               private title: Title, private snackbar: MatSnackBar  ) { }
  // ---------------------------------------PRODUCTS----------------------------------------------
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'products');
  }
  getProductById(id: string): Observable<Product> {
    const params = new HttpParams()
    .set('id', id);
    return this.http.get<Product>(this.apiUrl + 'products/getProduct', {params});
  }
  addProduct(product) {
    return this.http.post<string>(this.apiUrl + 'products/add', product, httpOptions );
  }
  // ---------------------------------------LOGIN AND SIGNUP----------------------------------------------
  login(loginCred): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'shared/login', loginCred, httpOptions);
  }

  emailCheck(email: string): Observable<boolean> {
    const params = new HttpParams()
    .set('email', email);
    return this.http.get<boolean>(this.apiUrl + 'shared/signup', {params});
  }

  signUpWithEmail(signupCred): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'shared/signupWithEmail', signupCred, httpOptions );
  }
  signUp(signupCred): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'shared/signup', signupCred, httpOptions );
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
  openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {duration: 2000});
  }
  // ---------------------------------------ORDERS----------------------------------------------
  placeOrder(order) {
    return this.http.post<string>(this.apiUrl + 'orders/create', order, httpOptions );
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + 'orders/getOrders');
  }
  getMyOrders(id: string): Observable<Order[]> {
    const params = new HttpParams()
    .set('userId', id);
    return this.http.get<Order[]>(this.apiUrl + 'orders/getMyOrders', {params});
  }
  getOrder(id: string): Observable<Order> {
    const params = new HttpParams()
    .set('_id', id);
    return this.http.get<Order>(this.apiUrl + 'orders/getOrder', {params});
  }
  changeStatus(order) {
    return this.http.put<string>(this.apiUrl + 'orders/changeStatus', order, httpOptions);
  }
  deleteOrder(id: string) {
    return this.http.delete(this.apiUrl + 'orders/' + id);
  }

  // ---------------------------------------USERS----------------------------------------------
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'users');
  }
  getUserBy(key, value): Observable<User> {
    const params = new HttpParams()
    .set(key, value);
    return this.http.get<User>(this.apiUrl + 'users/getUserBy', {params});
  }
  updateTotalOrder(id: string, length: number, task: string) {
    return this.http.put<string>(this.apiUrl + 'users/updateTotalOrder', {_id: id, totalOrders: length, task}, httpOptions);
  }
  updateAccount(value) {
    return this.http.put<string>(this.apiUrl + 'users/updateName', value, httpOptions);
  }
  checkPsd(value) {
    return this.http.post<string>(this.apiUrl + 'users/checkPassword', value, httpOptions);
  }
  updatePsd(value) {
    return this.http.put<string>(this.apiUrl + 'users/change-password', value, httpOptions);
  }
  updateCart(value) {
    return this.http.put<string>(this.apiUrl + 'users/updateCart', value, httpOptions);
  }
  // ------------------------------------ADMIN---------------------------------------------------------
  getNotification() {
    return this.http.get<{_id, order: Order, status}[]>(this.apiUrl + 'shared/getNotf');
  }
  saveNotification() {
    return this.http.put<{_id, order: Order, status}[]>(this.apiUrl + 'shared/setNotif', {status: 'read'}, httpOptions);
  }
}
