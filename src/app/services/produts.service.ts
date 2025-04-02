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

   private ProductSubject = new BehaviorSubject<Product[]>([{
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  }]);

  Product$ = this.ProductSubject.asObservable()
   private addProductSubject = new BehaviorSubject<Product>({
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  });

  addProduct$ = this.addProductSubject.asObservable()
  private editProductSubject = new BehaviorSubject<Product>({
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  });
  
  editProduct$ = this.editProductSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  getProductData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  setProducts(products: Product[]): void {
    this.ProductSubject.next(products);
  }
  setProductCount(count: number): void {
    this.productCountSubject.next(count);
  }

  setAddProduct(product: Product){
    this.addProductSubject.next(product)
  }
  setEditProduct(product: Product){
    this.editProductSubject.next(product)
  }




}
