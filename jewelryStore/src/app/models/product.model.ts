export interface Product {
  id: string;
  name: string;
  price: number;
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