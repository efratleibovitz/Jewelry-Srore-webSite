import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.servise';
import { Order, OrderStatus } from '../../models/order.model';
import { CommonModule } from '@angular/common';import { ChangeDetectorRef } from '@angular/core'; // ייבוא
@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders implements OnInit {
  orders: Order[] = [];
  // testMessage = "הקומפוננטה עובדת!"; // שורה חדשה
  statusOptions = [
    { label: 'בוטל', value: OrderStatus.Cancelled },
    { label: 'התקבל', value: OrderStatus.Received },
    { label: 'בטיפול', value: OrderStatus.Processing },
    { label: 'נשלח', value: OrderStatus.Shipped },
    { label: 'נמסר', value: OrderStatus.Delivered }
  ];
    constructor(
    private orderService: OrderService,  
    private cd: ChangeDetectorRef // הזרקה ב-Constructor
    ) {}

    ngOnInit() {
        this.loadOrders(); // קריאה לפונקציית הטעינה
      }

  // loadOrders() {
  //     this.orderService.getAllOrders().subscribe({
  //       next: (data) => {
  //         console.log("הנתונים שהגיעו מהשרת:", data); 
  //         this.orders = data; // כאן נכנסות כל 5 ההזמנות מה-DB שלך!
  //       },
  //       error: (err) => {
  //         console.error('שגיאה בטעינת הזמנות מהשרת:', err);
  //       }
  //     });
  //   }

loadOrders() {
  this.orderService.getAllOrders().subscribe({
    next: (data) => {
      console.log("הנתונים הגולמיים:", data); // תפתח את המערך ב-Console ותראה אם המפתחות מתחילים באות גדולה או קטנה
      this.orders = data;
      this.cd.detectChanges();
    }
  });
}


// כאן אנחנו קוראים לסרוויס שיביא את הנתונים
  getStatusLabel(status: number): string {
    return this.statusOptions.find(s => s.value === status)?.label || 'לא ידוע';
  }


onStatusChange(orderId: number, event: any) {
    const newStatus = +event.target.value;
    
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        console.log('הסטטוס עודכן בהצלחה ב-DB');
        // אופציונלי: רענון הנתונים כדי לוודא שהתצוגה מעודכנת
        // this.loadOrders(); 
      },
      error: (err) => console.error('שגיאה בעדכון הסטטוס:', err)
    });
  }


  
}
