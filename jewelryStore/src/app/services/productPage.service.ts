import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductPageService {
  private allProducts: any[] = [
    { id: 1, name: 'טבעת זהב', price: 1290, description: 'עיצוב נקי ועדין', imageUrl: 'pictures/studio.jpg',images: ['pictures/studio.jpg', 'pictures/studio2.jpg'],category: 'rings',availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', color: 'gold', style: 'studio', dateAdded: '2026-02-10' },
    { id: 2, name: 'עגילי פנינים', price: 890, description: 'קלאסי ואלגנטי', imageUrl: 'pictures/pearls.jpg',images: ['pictures/pearls.jpg', 'pictures/pearls2.jpg'], availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category: 'earrings', color: 'colorful', style: 'pearls', dateAdded: '2026-02-01' },
    { id: 3, name: 'צמיד כסף', price: 540, description: 'מינימליסטי', imageUrl: 'pictures/classic.jpg',images: ['pictures/studio.jpg', 'pictures/ring2.png'], availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category: 'bracelets', color: 'silver', style: 'classic', dateAdded: '2026-02-11' },
    { id: 4, name: 'שרשרת זהב', price: 540, description: 'מלכותי', imageUrl: 'pictures/trends.jpg',images: ['pictures/studio.jpg', 'pictures/ring2.png'],availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category: 'necklaces', color: 'gold', style: 'trendy', dateAdded: '2026-02-11' },
    { id: 5, name: 'טבעת זהב יוקרתית', price: 1290, description: 'עיצוב נקי ועדין', imageUrl: 'pictures/studio.jpg',images: ['pictures/studio.jpg', 'pictures/ring2.png'], availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category: 'rings', color: 'gold', style: 'studio', dateAdded: '2026-02-10' },
    { id: 6, name: 'עגילי פנינים עדינים', price: 200, description: 'קלאסי ואלגנטי', imageUrl: 'pictures/pearls.jpg',images:['pictures/studio.jpg'],availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category:'earrings' , color:'colorful' , style:'pearls' , dateAdded:'2026-02-01'},
    { id :7 , name : "צמיד כסף דק" , price : 140 , description : "מינימליסטי" , imageUrl : "pictures/classic.jpg", images:['pictures/studio.jpg'],availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category:'bracelets' , color:'silver' , style:'classic' , dateAdded:'2026-02-11'},
    { id: 8, name: 'שרשרת זהב עדינה', price: 540, description: 'מלכותי', imageUrl: 'pictures/trends.jpg',images: ['pictures/studio.jpg', 'pictures/ring2.png'], availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category: 'necklaces', color: 'gold', style: 'trendy', dateAdded: '2026-02-11' },
    { id: 9, name: 'טבעת זהב קלאסית', price: 1290, description: 'עיצוב נקי ועדין', imageUrl: 'pictures/studio.jpg',images: ['pictures/studio.jpg', 'pictures/ring2.png'], availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category:'rings' , color:'gold' , style:'studio' , dateAdded:'2026-02-10'},
    { id :10 , name : "עגילי פנינים לכלה" , price : 890 , description : "קלאסי ואלגנטי" , imageUrl : "pictures/pearls.jpg", images:['pictures/studio.jpg'],availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category:'earrings' , color:'colorful' , style:'pearls' , dateAdded:'2026-02-01'},
    { id :11 , name : "צמיד כסף מעוצב" , price : 540 , description : "מינימליסטי" , imageUrl : "pictures/classic.jpg", images:['pictures/studio.jpg'],availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category:'bracelets' , color:'silver' , style:'classic' , dateAdded:'2026-02-11'},
    { id :12, name:"שרשרת זהב לאירוע",price:"54",description:"מלכותי",imageUrl:"pictures/trends.jpg",images:['pictures/studio.jpg'],availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100', category:"necklaces",color:"gold",style:"trendy",dateAdded:"2026-03-3"},
    { id :13, name:"טבעת זהב משובצת",price:"1399",description:"עיצוב נקי ועדין",imageUrl:"pictures/studio.jpg",images:['pictures/studio.jpg'],availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ],promoText: 'קנו ב-₪150 שלמו ₪100',  category:"rings",color:"gold",style:"studio",dateAdded:"2026-03-5"   },
    { id: 14, name: 'עגילי פנינים קטנים', price: 200, description: 'קלאסי ואלגנטי', imageUrl: 'pictures/pearls.jpg',images: ['pictures/studio.jpg', 'pictures/ring2.png'], availableSizes:[
        { size: '48', inStock:true },
        { size:'50',inStock:true}
      ], promoText: 'קנו ב-₪150 שלמו ₪100', category: 'earrings', color: 'colorful', style: 'pearls', dateAdded: '2026-02-01' },
    { id: 15, name: 'צמיד כסף רחב', price: 140, description: 'מינימליסטי', imageUrl: 'pictures/classic.jpg', images:['pictures/studio.jpg'],availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ], promoText: 'קנו ב-₪150 שלמו ₪100', category: 'bracelets', color: 'silver', style: 'classic', dateAdded: '2026-02-11' },
    { id: 16, name: 'שרשרת זהב ארוכה', price: 540, description: 'מלכותי', imageUrl: 'pictures/trends.jpg', images:['pictures/studio.jpg'], availableSizes: [
        { size: '48', inStock: true },
        { size: '50', inStock: true }
      ], promoText: 'קנו ב-₪150 שלמו ₪100', category: 'necklaces', color: 'gold', style: 'trendy', dateAdded: '2026-02-11' }
  ];

  getProducts() {
    return [...this.allProducts];
  }

  getProductById(id: number) {
    return this.allProducts.find(p => p.id === id);
  }
// בתוך מחלקת ProductPageService
updateProduct(updatedProduct: any) {
  const index = this.allProducts.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    this.allProducts[index] = updatedProduct;
    console.log('המוצר עודכן בסרוויס של רחל!');
  }
}
  // לוגיקת סינון מאוחדת
  getFilteredProducts(filters: any) {
    let filtered = [...this.allProducts];

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.color) {
      filtered = filtered.filter(p => p.color === filters.color);
    }
    if (filters.style) {
      filtered = filtered.filter(p => p.style === filters.style);
    }
    if (filters.priceRange) {
      filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    }

    // לוגיקת מיון
    if (filters.sortValue === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortValue === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortValue === 'new') {
      filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }

    return filtered;
  }
}