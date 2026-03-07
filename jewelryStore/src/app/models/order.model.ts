// הגדרת הסטטוסים בצורה ברורה
export enum OrderStatus {
  Received = 1,
  Processing = 2,
  Shipped = 3,
  Delivered = 4,
  Cancelled = 0
}

// ממשק לפריט בודד (טבעת, עגילים וכו')
export interface OrderItem {
  orderId: number;
  productName: string;
  quantity: number;
  // השדות הבאים יגיעו כרגע כ-undefined אלא אם תוסיפי אותם ב-DTO בשרת:
  price?: number; 
  image?: string;
  size?: string;
  productUrl?: string;
}

// ממשק לכתובת
export interface Address {
  fullName: string;
  city: string;
  street: string;
  houseNumber: string;
  isDefault: boolean;
}

// הממשק הראשי של ההזמנה
export interface Order {
  orderId: number;      // במקום id
  userId: number;       // מזהה המשתמש מה-DB
  orderDate: string;      // במקום date
  status: number;  // נשאר אותו דבר
  orderSum: number;     // במקום totalAmount
  
  // השדות האלו כרגע אופציונליים כי הם לא קיימים ב-OrderDto הבסיסי ששלחת
  orderNumber?: string; 
  items?: OrderItem[];
  shippingAddress?: Address;
  // orderItems: OrderItemDto[];
  orderItems: OrderItem[];
  isUpdating?: boolean; // שדה עזר למעקב אחרי עדכון סטטוס
}


export interface OrderItemDto {
  orderId: number;
  quantity: number;
  productName: string;
  // אם את רוצה להציג תמונה ומחיר, תצטרכי להוסיף אותם גם ב-OrderItemDto ב-C#
}

