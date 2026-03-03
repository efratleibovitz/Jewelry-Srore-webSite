export interface Product {
  id: number;
  name: string;  
  shortDescription: string;
  price: number;

  image1: string;
  categoryId?: number;
  longDescription?: string;
  image2?: string; 
  sizes?: ProductSize[];  
}
export interface ProductSize {
  size: number;
  amount: number;

  description: string;
  images: string[]; 
  promoText?: string; // טקסט המבצע
  availableSizes: { size: string, inStock: boolean }[]; // ניהול מלאי לפי מידה
}

export interface Size {
    productSize: string; // לשנות ל-p קטנה
    amount: number;      // לשנות ל-a קטנה
}
export interface AdminProduct {
    productId: number;
    productName: string;
    shortDescription: string;
    longDescription: string;
    productPrice: number;
    categoryId: number;
    color: string;
    dateAdded: string; // או Date
    image1: string;
    image2: string;
    justOnline: boolean;
    isClassic: boolean;
    isTrendy: boolean;
    isPearls: boolean;
    isStudio: boolean;
    sizes: Size[];

}