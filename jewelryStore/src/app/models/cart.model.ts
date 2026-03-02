export interface CartItem {
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  image1: string;
  size: number | null;
  maxAmount: number;
}