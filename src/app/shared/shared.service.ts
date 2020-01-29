import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
@Injectable()
export class SharedService {
  isAdmin = true;
  page: string;
  constructor( private http: HttpClient,
               private title: Title ) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:4000/api/');
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
