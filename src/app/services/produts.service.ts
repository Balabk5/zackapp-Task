import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutsService {
  private apiUrl = 'https://fakestoreapi.com/products';
   
   private productCountSubject = new BehaviorSubject<number>(0);
   productCount$ = this.productCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProductData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  
  setProductCount(count: number): void {
    this.productCountSubject.next(count);
  }
}
