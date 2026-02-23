import { Injectable } from '@angular/core';
import { Order, OrderStatus } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  // המידע שהעברנו מהקומפוננטה לסרוויס
  private userOrders: Order[] = [
    {
        orderNumber: '111868598',
        date: new Date('2026-02-19'),
        status: OrderStatus.Shipped, // סטטוס 3 - נשלח
        totalAmount: 139.00,
        items: [
            {
                id: 1,
                productName: 'טבעת כסף 925 בצורת עלים',
                price: 139.00,
                image: 'pictures/ring1.png',  // <-- Use single image
                quantity: 1,
                productUrl: '/product/R29991SZ'
            }
        ],
        shippingAddress: {
            fullName: 'ישראלה ישראלי',
            city: 'תל אביב',
            street: 'דיזינגוף',
            houseNumber: '100',
            isDefault: true
        },
        id: ''
    }
  ];

  // פונקציה שמאפשרת לקומפוננטה לקבל את ההזמנות
  getUserOrders(): Order[] {
    return this.userOrders;
  }
}