import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private allProducts: Product[] = [
  {
  id: 'R29991SZ',
  name: 'טבעת כסף 925 בצורת עלים',
  price: 139.0,
  promoText: 'קנו ב-₪150 שלמו ₪100', // הטקסט שיהיה ניתן לעריכה
  availableSizes: [
    { size: '48.0', inStock: true },
    { size: '50.0', inStock: true },
    { size: '52.0', inStock: false }, // לדוגמה מידה שאזלה
    { size: '54.0', inStock: true },
    { size: '56', inStock: true },
    { size: '58', inStock: true }
  ],
  images: ['pictures/ring1.png', 'pictures/ring2.png'],
  description: 'טבעת כסף סטרלינג 925 בעיצוב עלים עדין.'
},
{
  id: 'R29991SZ',
  name: 'שרשרת פנינים',
  price: 139.0,
  promoText: 'קנו ב-₪150 שלמו ₪100', // הטקסט שיהיה ניתן לעריכה
  availableSizes: [
    { size: '48', inStock: true },
    { size: '50', inStock: true },
    { size: '52', inStock: false }, // לדוגמה מידה שאזלה
    { size: '54', inStock: true },
    { size: '56', inStock: true },
    { size: '58', inStock: true }
  ],
  images: ['pictures/pearls.jpg'],
  description: 'שרשרת פנינים יוקרתית.'
}

  ];

  getProducts() { return this.allProducts; }

  getProductById(id: string) {
    return this.allProducts.find(p => p.id === id);
  }

  updateProduct(updatedProduct: Product) {
  const index = this.allProducts.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    this.allProducts[index] = updatedProduct;
  }
  }

}