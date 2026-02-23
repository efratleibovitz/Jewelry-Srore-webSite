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
  id: number;
  productName: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
  productUrl: string;
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
  id: string;
  orderNumber: string;
  date: Date;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  totalAmount: number;
}