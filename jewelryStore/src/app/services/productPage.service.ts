import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductPageService {

  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProductsFromApi(query: {
    categoryId: number | null;
    color: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    justOnline: boolean | null;
    isClassic: boolean | null;
    isTrendy: boolean | null;
    isPearls: boolean | null;
    isStudio: boolean | null;
    sortMode: string | null;
  }): Observable<Product[]> {

    let params = new HttpParams();

    // מוסיפים רק מה שלא null/undefined
    Object.entries(query).forEach(([key, val]) => {
      if (val !== null && val !== undefined && val !== '') {
        params = params.set(key, String(val));
      }
    });

    return this.http.get<Product[]>(this.baseUrl, { params });
  }
}