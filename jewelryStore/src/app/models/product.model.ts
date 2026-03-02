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
}