import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // הוספנו OnInit
import { ActivatedRoute } from '@angular/router'; // הוספנו לטובת ה-ID
import { ProductService } from '../../services/product.service'; // הסרוויס שניצור
import { Product } from '../../models/product.model'    // המודל שהוצאנו לקובץ נפרד
import { ProductPageService } from '../../services/productPage.service';
// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';

import { FormsModule } from '@angular/forms'; // חייבת לייבא בשביל ngModel

@Component({
  selector: 'app-product-details',
  standalone: true, // באנגולר החדש
  imports: [CommonModule, DialogModule, AccordionModule, CarouselModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  // במקום @Input, אנחנו מגדירים משתנה שיקבל נתונים מהסרוויס
  product: Product | undefined;
  selectedSize: string | null = null;
// משתני ניהול
  isAdmin: boolean = true; // כרגע נשים על true לצורך פיתוח
  isEditMode: boolean = false;
  editedProduct: Product | undefined; // אובייקט זמני לעריכה

  currentImgIndex: number = 0;
  displaySizeGuide: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductPageService
  ) {}

ngOnInit() {
  const productId = this.route.snapshot.paramMap.get('id');
  
  if (productId) {
    // 1. נשלוף את המוצר מהסרוויס של רחל כ-any כדי שלא יצעק על שדות לא מוכרים
    const rawProduct = this.productService.getProductById(Number(productId)) as any;
    
    if (rawProduct) {
      // 2. נבנה את האובייקט מחדש לפי המבנה שלך (המודל Product)
      this.product = {
        id: String(rawProduct.id),
        name: rawProduct.name,
        price: rawProduct.price,
        description: rawProduct.description || '',
        // כאן הקסם: אם אין לו מערך images, ניצור אחד מה-imageUrl שלה
        images: rawProduct.images || [rawProduct.imageUrl], 
        promoText: rawProduct.promoText || '',
        // אם רחל לא הגדירה מידות, נשים מידה אחת כברירת מחדל כדי שהעיצוב לא יישבר
        availableSizes: rawProduct.availableSizes || [{ size: 'OS', inStock: true }]
      };
    }
  }
}

  // --- הפונקציות המצוינות שכתבת נשארות בדיוק אותו דבר! ---
  nextImage() {
    if (this.product) {
      this.currentImgIndex = (this.currentImgIndex + 1) % this.product.images.length;
    }
  }

  prevImage() {
    if (this.product) {
      this.currentImgIndex = (this.currentImgIndex - 1 + this.product.images.length) % this.product.images.length;
    }
  }

  setCurrentImage(index: number) {
    this.currentImgIndex = index;
  }

  showSizeGuide() {
    this.displaySizeGuide = true;
  }



  toggleEdit() {
    if (!this.isEditMode) {
      // כשנכנסים לעריכה, מעתיקים את המוצר לאובייקט זמני
      this.editedProduct = JSON.parse(JSON.stringify(this.product));
    }
    this.isEditMode = !this.isEditMode;
  }

  selectSize(sizeObj: { size: string, inStock: boolean }) {
      if (sizeObj.inStock) {
          this.selectedSize = sizeObj.size;
          console.log('מידה נבחרת:', this.selectedSize);
      }
  }
  

  toggleSizeStock(sizeObj: { size: string, inStock: boolean }) {
    if (this.isEditMode) {
      sizeObj.inStock = !sizeObj.inStock;
    }
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  // פונקציה שבודקת אם יש לפחות מידה אחת במלאי
get isAnySizeInStock(): boolean {
  if (!this.product || !this.product.availableSizes) {
    return false;
  }
  return this.product.availableSizes.some(s => s.inStock);
}

saveChanges() {
  if (this.editedProduct) {
    // כאן נוצר האובייקט הסופי שיישלח ל-API
    const productToSend = { ...this.editedProduct };
    
    console.log('שולח ל-API:', productToSend);
    
    // עדכון מקומי כדי שהמשתמש יראה את השינוי מיד
    this.product = productToSend;
    this.productService.updateProduct(this.product); // מעדכנים בסרוויס
    this.isEditMode = false;
    alert('השינויים נשמרו בהצלחה!');
  }
}
}