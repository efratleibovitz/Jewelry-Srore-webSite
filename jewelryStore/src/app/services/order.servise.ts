import { Injectable } from '@angular/core';
import { Order, OrderStatus } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private apiUrl = 'https://localhost:44320/api/Orders';
  constructor(private http: HttpClient) { }
  // המידע שהעברנו מהקומפוננטה לסרוויס
 
  getAllOrders(): Observable<Order[]> {
      return this.http.get<Order[]>(this.apiUrl);
  }
  // // פונקציה שמאפשרת לקומפוננטה לקבל את ההזמנות
  // getUserOrders(): Order[] {
  //   return this.userOrders;
  // }

  updateOrderStatus(orderId: number, newStatus: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}/status`, newStatus);
  }

  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }
  getOrdersByUserId(userId: number): Observable<Order[]> {
  // פנייה לנתיב: https://localhost:44320/api/Orders/user/{userId}
  return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
}
}