import { Component,OnInit } from '@angular/core';
import { AddressCard } from '../address-card/address-card';
import { CommonModule } from '@angular/common';
import { OrderStepper } from '../order-stepper/order-stepper';
import { OrderItemsList } from '../order-items-list/order-items-list';
import { RouterModule } from '@angular/router';
import { Order, OrderStatus } from '../../../models/order.model';
import { OrderService } from '../../../services/order.servise';
import { UserService } from '../../../services/user.service';     
import { MessageService } from 'primeng/api'; // ייבוא השירות
import { signal } from '@angular/core';
@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [CommonModule, OrderStepper, OrderItemsList, RouterModule],
  templateUrl: './orders-history.html',
  styleUrl: './orders-history.css',
  providers: [MessageService]
})
export class OrdersHistory implements OnInit {
  //
  // orders: Order[] = [];
  orders = signal<any[]>([]);
constructor(
    private orderService: OrderService,
    private userService: UserService, // הזרקת ה-UserService
    private messageService: MessageService // הזרקה
  
  ) {}

ngOnInit() {
    // 1. שליפת המשתמש המחובר מה-Signal שבסרוויס
    const user = this.userService.getCurrentUser();

    if (user && user.id) {
      // 2. קריאה לסרוויס עם ה-ID הספציפי
      this.orderService.getOrdersByUserId(user.id).subscribe({
        next: (data) => {
              // this.orders = data;
              this.orders.set(data);
          console.log("הזמנות עבור משתמש " + user.id, this.orders());
        },
        error: (err) => console.error("שגיאה במשיכת היסטוריית הזמנות:", err)
      });
    } else {
      console.warn("לא נמצא משתמש מחובר");
      // כאן אפשר להוסיף ניווט לדף התחברות אם רוצים
    }
  }


// הוספת פונקציית העדכון
confirmDelivery(order: any) {
  order.isUpdating = true;
    if (order.status === 3) {
      this.orderService.updateOrderStatus(order.orderId, 4).subscribe({
        next: () => {
          // order.status = 4;
          this.orders.update(prevOrders =>
            prevOrders.map(o =>
            o.orderId === order.orderId ? { ...o, status: 4, isUpdating: false } : o
            )
          );
          console.log('העדכון הצליח בשרת');
          order.isUpdating = false
          // הצגת הודעת הצלחה
          this.messageService.add({
            severity: 'success',
            summary: 'עודכן בהצלחה',
            detail: `הזמנה #${order.orderId} סומנה כנמסרה. תתחדשי!`,
            life: 3000 // ההודעה תיעלם אחרי 3 שניות
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'שגיאה',
            detail: 'לא הצלחנו לעדכן את הסטטוס, נסי שוב מאוחר יותר.'
          });
          console.error(err);
        }
      });
    }
    else{
      order.isUpdating = false;
      this.messageService.add({
        severity: 'warn',
        summary: 'פעולה לא אפשרית',
        detail: 'הסטטוס הנוכחי של ההזמנה אינו מאפשר לסמן אותה כנמסרה.'
      });
    }
  }

}
