import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { User } from '../users';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};
@Injectable()
export class SharedService {
  isAdmin = true;
  page: string;
  apiUrl = 'http://localhost:4000/api';
  constructor( private http: HttpClient,
               private title: Title ) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  login(loginCred): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/login', loginCred, httpOptions);
  }

  emailCheck(email: string): Observable<boolean> {
    const params = new HttpParams()
    .set('email', email);
    // console.log(params);
    return this.http.get<boolean>(this.apiUrl + '/signup', {params});
  }

  signUp(signupCred): Observable<User> {
    // console.log(signupCred);
    return this.http.post<User>(this.apiUrl + '/signup', signupCred, httpOptions );
  }
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
}
