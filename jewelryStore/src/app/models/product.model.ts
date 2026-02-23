export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[]; 
  promoText?: string; // טקסט המבצע
  availableSizes: { size: string, inStock: boolean }[]; // ניהול מלאי לפי מידה
}