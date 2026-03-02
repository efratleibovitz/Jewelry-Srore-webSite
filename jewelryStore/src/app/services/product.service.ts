// import { Injectable } from '@angular/core';
// import { Product } from '../models/product.model';

// @Injectable({ providedIn: 'root' })
// export class ProductService {
//   private allProducts: Product[] = [];

//   getProducts() { return this.allProducts; }

//   getProductById(id: number) {
//     return this.allProducts.find(p => p.id === id);
//   }

//   updateProduct(updatedProduct: Product) {
//   const index = this.allProducts.findIndex(p => p.id === updatedProduct.id);
//   if (index !== -1) {
//     this.allProducts[index] = updatedProduct;
//   }
//   }

// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  // ✅ מוצר לפי id
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // (אופציונלי) עדכון מוצר
  updateProduct(id: number, payload: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, payload);
  }
}