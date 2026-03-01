import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminProduct, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:44320/api/products'; // החליפי בכתובת האמיתית

  constructor(private http: HttpClient) {}

  // קבלת כל המוצרים לטבלה
 getAllProducts(): Observable<AdminProduct[]> { // כאן חייב להיות AdminProduct
  return this.http.get<AdminProduct[]>(this.apiUrl);
}


  // עדכון מוצר קיים
  updateProduct(id: number, product: AdminProduct): Observable<AdminProduct> {
    // עכשיו כש-product הוא AdminProduct, הוא כולל בתוכו את מערך ה-sizes
    return this.http.put<AdminProduct>(`${this.apiUrl}/${id}`, product);
  }

// יצירת מוצר חדש
createProduct(product: AdminProduct): Observable<AdminProduct> {
  return this.http.post<AdminProduct>(this.apiUrl, product);
}

  // מחיקת מוצר
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}