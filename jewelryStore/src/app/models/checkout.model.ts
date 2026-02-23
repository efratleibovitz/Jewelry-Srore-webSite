export interface CheckoutData {
  personalDetails: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  shippingMethod: {
    type: 'courier' | 'pickup';
    cost: number;
    branch?: string;
  };
}