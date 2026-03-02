import { Component,OnInit } from '@angular/core';
import { AddressCard } from '../address-card/address-card';
import { CommonModule } from '@angular/common';
import { OrderStepper } from '../order-stepper/order-stepper';
import { OrderItemsList } from '../order-items-list/order-items-list';
import { RouterModule } from '@angular/router';
import { Order, OrderStatus } from '../../../models/order.model';
import { OrderService } from '../../../services/order.servise';
import { UserService } from '../../../services/user.service';     
@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [CommonModule, OrderStepper, OrderItemsList, RouterModule],
  templateUrl: './orders-history.html',
  styleUrl: './orders-history.css',
})
export class OrdersHistory implements OnInit {
  //
  orders: Order[] = [];

constructor(
    private orderService: OrderService,
    private userService: UserService // הזרקת ה-UserService
  ) {}

ngOnInit() {
    // 1. שליפת המשתמש המחובר מה-Signal שבסרוויס
    const user = this.userService.getCurrentUser();

    if (user && user.id) {
      // 2. קריאה לסרוויס עם ה-ID הספציפי
      this.orderService.getOrdersByUserId(user.id).subscribe({
        next: (data) => {
          this.orders = data;
          console.log("הזמנות עבור משתמש " + user.id, this.orders);
        },
        error: (err) => console.error("שגיאה במשיכת היסטוריית הזמנות:", err)
      });
    } else {
      console.warn("לא נמצא משתמש מחובר");
      // כאן אפשר להוסיף ניווט לדף התחברות אם רוצים
    }
  }
}
