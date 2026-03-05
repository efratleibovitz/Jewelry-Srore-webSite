// // import { CommonModule } from '@angular/common';
// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import { ProductPageService } from '../../services/productPage.service';
// // import { Product } from '../../models/product.model';
// // // PrimeNG
// // import { DialogModule } from 'primeng/dialog';
// // import { AccordionModule } from 'primeng/accordion';
// // import { CarouselModule } from 'primeng/carousel';

// // import { FormsModule } from '@angular/forms';

// // @Component({
// //   selector: 'app-product-details',
// //   standalone: true,
// //   imports: [CommonModule, DialogModule, AccordionModule, CarouselModule, FormsModule],
// //   templateUrl: './product-details.html',
// //   styleUrl: './product-details.css',
// // })
// // export class ProductDetails implements OnInit {
// //   // הגדרה כ-any כדי למנוע שגיאות Type מול ה-HTML בשלב זה
// //   product: any = null;
// //   selectedSize: string | null = null;
  
// //   // משתני ניהול
// //   isAdmin: boolean = true;
// //   isEditMode: boolean = false;
// //   editedProduct: any = null; 

// //   currentImgIndex: number = 0;
// //   displaySizeGuide: boolean = false;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private productService: ProductPageService
// //   ) {}
// //   ngOnInit() {
// //     const idStr = this.route.snapshot.paramMap.get('id');
// //     const id = idStr ? Number(idStr) : NaN;
// //     if (!id) return;

// //     this.productService.getProductById(id).subscribe({
// //       next: (p: any) => {
// //         // אם ה-API שלך כבר מחזיר images/availableSizes – תשאירי כמו שהוא
// //         // אם לא, עושים התאמה מינימלית:
// //         this.product = {
// //           id: p.id,
// //           name: p.name,
// //           price: p.price,
// //           description: p.description ?? '',
// //           images: p.images ?? (p.image1 ? [p.image1] : []),
// //           availableSizes: p.availableSizes ?? [{ size: 'OS', inStock: true }],
// //         };
// //       },
// //       error: (err) => console.error('Product not found', err)
// //     });
// //   }

// //   // ngOnInit() {
// //   //   const productId = this.route.snapshot.paramMap.get('id');
    
// //   //   if (productId) {
// //   //     try {
// //   //       // שימוש ב-any כדי לעקוף שגיאות פונקציה חסרה בסרוויס כרגע
// //   //       const serviceAsAny = this.productService as any;
        
// //   //       if (serviceAsAny.getProductById) {
// //   //         serviceAsAny.getProductById(Number(productId)).subscribe({
// //   //           next: (rawProduct: any) => {
// //   //             if (rawProduct) {
// //   //               this.product = {
// //   //                 id: String(rawProduct.id),
// //   //                 name: rawProduct.name,
// //   //                 price: rawProduct.price,
// //   //                 description: rawProduct.description || '',
// //   //                 images: rawProduct.images || (rawProduct.imageUrl ? [rawProduct.imageUrl] : []),
// //   //                 availableSizes: rawProduct.availableSizes || [{ size: 'OS', inStock: true }]
// //   //               };
// //   //             }
// //   //           },
// //   //           error: (err: any) => console.error('Product not found', err)
// //   //         });
// //   //       } else {
// //   //         // ברירת מחדל כדי שהדף לא יהיה ריק לגמרי בזמן פיתוח
// //   //         this.product = { images: [], availableSizes: [] };
// //   //       }
// //   //     } catch (e) {
// //   //       console.warn('Service integration pending...');
// //   //     }
// //   //   }
// //   // }

// //   nextImage() {
// //     if (this.product?.images?.length) {
// //       this.currentImgIndex = (this.currentImgIndex + 1) % this.product.images.length;
// //     }
// //   }

// //   prevImage() {
// //     if (this.product?.images?.length) {
// //       this.currentImgIndex = (this.currentImgIndex - 1 + this.product.images.length) % this.product.images.length;
// //     }
// //   }

// //   setCurrentImage(index: number) {
// //     this.currentImgIndex = index;
// //   }

// //   showSizeGuide() {
// //     this.displaySizeGuide = true;
// //   }

// //   toggleEdit() {
// //     if (!this.isEditMode && this.product) {
// //       this.editedProduct = JSON.parse(JSON.stringify(this.product));
// //     }
// //     this.isEditMode = !this.isEditMode;
// //   }

// //   selectSize(sizeObj: any) {
// //     if (sizeObj.inStock) {
// //       this.selectedSize = sizeObj.size;
// //     }
// //   }

// //   toggleSizeStock(sizeObj: any) {
// //     if (this.isEditMode) {
// //       sizeObj.inStock = !sizeObj.inStock;
// //     }
// //   }

// //   cancelEdit() {
// //     this.isEditMode = false;
// //     this.editedProduct = null;
// //   }

// //   get isAnySizeInStock(): boolean {
// //     if (!this.product?.availableSizes) {
// //       return false;
// //     }
// //     return this.product.availableSizes.some((s: any) => s.inStock);
// //   }

// //   saveChanges() {
// //     if (this.editedProduct) {
// //       this.product = { ...this.editedProduct };
      
// //       const serviceAsAny = this.productService as any;
// //       if (serviceAsAny.updateProduct) {
// //         serviceAsAny.updateProduct(this.product);
// //       }
      
// //       this.isEditMode = false;
// //       alert('השינויים נשמרו בהצלחה!');
// //     }
// //   }
// // }
// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// // PrimeNG
// import { DialogModule } from 'primeng/dialog';
// import { AccordionModule } from 'primeng/accordion';
// import { CarouselModule } from 'primeng/carousel';

// import { Product, ProductSize } from '../../models/product.model';
// import { ProductService } from '../../services/product.service';

// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   imports: [CommonModule, DialogModule, AccordionModule, CarouselModule, FormsModule],
//   templateUrl: './product-details.html',
//   styleUrl: './product-details.css',
// })
// export class ProductDetails implements OnInit {

//   product: Product | null = null;

//   // מידה היא number (מגיע מהשרת כ-float/double)
//   selectedSize: number | null = null;

//   currentImgIndex = 0;
//   displaySizeGuide = false;

//   // ------------------------------
//   // מנהל/עריכה - כרגע בהערה
//   // isAdmin = false;
//   // isEditMode = false;
//   // editedProduct: Product | null = null;
//   // ------------------------------

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) {}

//   ngOnInit(): void {
//     const idStr = this.route.snapshot.paramMap.get('id');
//     const id = idStr ? Number(idStr) : NaN;

//     if (!Number.isFinite(id) || id <= 0) return;

//     this.productService.getProductById(id).subscribe({
//       next: (p) => {
//         this.product = p;
//         this.currentImgIndex = 0;
//         this.selectedSize = null;
//       },
//       error: (err) => console.error('Product not found', err)
//     });
//   }

//   // בונים רשימת תמונות לתצוגה מתוך image1 + image2 (אם קיימת)
//   get displayImages(): string[] {
//     if (!this.product) return [];
//     return [this.product.image1, this.product.image2 ?? null]
//       .filter((x): x is string => !!x && x.trim().length > 0);
//   }

//   // מחזירים רק מידות עם quantity > 0
//   get availableSizes(): ProductSize[] {
//     if (!this.product?.sizes) return [];
//     return this.product.sizes.filter(s => s.quantity > 0);
//   }

//   // האם בכלל להציג אזור מידות
//   get hasSizes(): boolean {
//     return this.availableSizes.length > 0;
//   }

//   // האם המשתמש בחר מידה (רלוונטי רק אם יש מידות)
//   get isSizeSelected(): boolean {
//     return !this.hasSizes || this.selectedSize !== null;
//   }

//   nextImage(): void {
//     const imgs = this.displayImages;
//     if (imgs.length <= 1) return;
//     this.currentImgIndex = (this.currentImgIndex + 1) % imgs.length;
//   }

//   prevImage(): void {
//     const imgs = this.displayImages;
//     if (imgs.length <= 1) return;
//     this.currentImgIndex = (this.currentImgIndex - 1 + imgs.length) % imgs.length;
//   }

//   setCurrentImage(index: number): void {
//     this.currentImgIndex = index;
//   }

//   selectSize(s: ProductSize): void {
//     this.selectedSize = s.size;
//   }

//   showSizeGuide(): void {
//     this.displaySizeGuide = true;
//   }

//   // ------------------------------
//   // מנהל/עריכה - כרגע בהערה
//   // toggleEdit() { ... }
//   // saveChanges() { ... }
//   // cancelEdit() { ... }
//   // ------------------------------
// }
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';

import { Product, ProductSize } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { catchError, finalize } from 'rxjs/operators';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core'; // ייבוא חסר
import { take } from 'rxjs';
import { CartStorage } from '../../services/cart-storage.service'; // ייבוא חדש
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, DialogModule, AccordionModule, CarouselModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  quantity = 1;
  product: Product | null = null;

  loading = true;
  errorMsg: string | null = null;

  selectedSize: number | null = null;

  currentImgIndex = 0;
  displaySizeGuide = false;

  // ------------------------------
  // מנהל/עריכה - כרגע בהערה
  // isAdmin = false;
  // isEditMode = false;
  // editedProduct: Product | null = null;
  // ------------------------------

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef ,// הזרקת השרות
    private cartStorage: CartStorage,
    private msg: MessageService
  ) {}
get selectedSizeMax(): number {
  if (!this.product || this.selectedSize === null) return 1;
  const s = this.product.sizes?.find(x => x.size === this.selectedSize);
  return Number(s?.amount ?? 1);
}
//  ngOnInit(): void {
//   this.route.paramMap
//     .pipe(
//       switchMap(params => {
//         const idStr = params.get('id');
//         const id = idStr ? Number(idStr) : NaN;

//         // reset state בכל מעבר
//         this.product = null;
//         this.selectedSize = null;
//         this.currentImgIndex = 0;
//         this.displaySizeGuide = false;

//         this.loading = true;
//         this.errorMsg = null;

//         if (!Number.isFinite(id) || id <= 0) {
//           this.errorMsg = 'מזהה מוצר לא תקין';
//           // חשוב: להחזיר observable ריק ולהוריד loading דרך finalize למטה
//           return of(null).pipe(finalize(() => (this.loading = false)));
//         }

//         return this.productService.getProductById(id).pipe(
//           finalize(() => (this.loading = false))
//         );
//       })
//     )
//     .subscribe({
//       next: (p) => {
//         if (!p) return;
//         this.product = p;

//         // מתחילים תמיד מהתמונה הראשונה
//         this.currentImgIndex = 0;

//         console.log('Product from API:', p);
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMsg = 'לא הצלחתי לטעון את המוצר';
//         // ❌ לא נוגעים כאן ב-loading בכלל
//       },
//     });
// }
  ngOnInit(): void {
  this.route.paramMap
    .pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.loading = true; // מבטיחים טעינה לפני הכל
        
        if (!id || isNaN(id)) {
          this.loading = false;
          this.errorMsg = 'מזהה מוצר לא תקין';
          return of(null);
        }

        return this.productService.getProductById(id).pipe(
          take(1), // הנה ה-take המדובר
          catchError(err => {
            console.error(err);
            this.loading = false;
            this.errorMsg = 'שגיאה בטעינה מהשרת';
            return of(null);
          })
        );
      })
    )
    .subscribe({
      next: (p: Product | null) => {
        this.product = p;
        console.log('sizes:', (p as any)?.sizes);
        this.loading = false; // כאן הטעינה חייבת להיפסק
        this.cdr.detectChanges(); // ליתר ביטחון
      }
    });
}
  // ✅ מחשב את רשימת התמונות להצגה
get displayImages(): string[] {
  if (!this.product) return [];

  const img1 = this.product.image1?.trim();
  const img2Raw = (this.product as any).image2;
  
  // טיפול בערכי "null" כמחרוזת מה-DB
  const img2 = (img2Raw === 'null' || img2Raw === null || img2Raw === undefined)
    ? null
    : String(img2Raw).trim();

  return [img1, img2].filter((x): x is string => !!x && x.length > 0);
}
  // ✅ תמונה בטוחה להצגה (כדי למנוע undefined)
  get currentImage(): string | null {
    const imgs = this.displayImages;
    if (imgs.length === 0) return null;

    if (this.currentImgIndex < 0 || this.currentImgIndex >= imgs.length) {
      this.currentImgIndex = 0;
    }
    return imgs[this.currentImgIndex];
  }

  // ✅ מחזירים רק מידות עם quantity > 0
  get availableSizes(): ProductSize[] {
    if (!this.product?.sizes) return [];
    return this.product.sizes.filter(s => (s?.amount ?? 0) > 0);
  }

  get hasSizes(): boolean {
    return this.availableSizes.length > 0;
  }

  get isSizeSelected(): boolean {
    return !this.hasSizes || this.selectedSize !== null;
  }
private getSelectedStock(): number {
  const s = this.product?.sizes?.find(x => x.size === this.selectedSize);
  return Number(s?.amount ?? 0);
}
private lastWarnedMax: number | null = null;

onQuantityChange(val: any) {
  let q = Number(val);

  if (!Number.isFinite(q) || q < 1) q = 1;

  // אם עוד לא נבחרה מידה – לא מציקים, רק שומרים כמות תקינה
  if (this.selectedSize === null) {
    this.quantity = q;
    return;
  }

  const max = this.selectedSizeMax;

  if (q >= max) {
    // כדי שלא יקפוץ מיליון פעמים בזמן הקלדה
    if (this.lastWarnedMax !== max) {
      this.msg.add({
        severity: 'warn',
        summary: 'המלאי מוגבל',
        detail: `אפשר להזמין עד ${max} יחידות במידה הזו`,
        life: 2200,
      });
      this.lastWarnedMax = max;
    }
    this.quantity = max;
    return;
  }

  this.lastWarnedMax = null;
  this.quantity = q;
}
selectSize(s: ProductSize): void {
  this.selectedSize = s.size;

  if (this.quantity >= this.selectedSizeMax) {
    this.msg.add({
      severity: 'warn',
      summary: 'המלאי מוגבל',
      detail: `במידה הזו אפשר עד ${this.selectedSizeMax} יחידות`,
      life: 2200,
    });
    this.quantity = this.selectedSizeMax;
  }
}

  nextImage(): void {
    const imgs = this.displayImages;
    if (imgs.length <= 1) return;
    this.currentImgIndex = (this.currentImgIndex + 1) % imgs.length;
  }

  prevImage(): void {
    const imgs = this.displayImages;
    if (imgs.length <= 1) return;
    this.currentImgIndex = (this.currentImgIndex - 1 + imgs.length) % imgs.length;
  }

  setCurrentImage(index: number): void {
    const imgs = this.displayImages;
    if (index < 0 || index >= imgs.length) return;
    this.currentImgIndex = index;
  }

  // selectSize(s: ProductSize): void {
  //   this.selectedSize = s.size;
  // }

  showSizeGuide(): void {
    this.displaySizeGuide = true;
  }
//   addToCartFromDetails() {
//     if (!this.product) return;
//   this.cartStorage.addToCart(this.product, this.quantity);
// }
addToCartFromDetails() {
  if (!this.product) return;

  if (!this.hasSizes) {
    this.errorMsg = 'המוצר אזל מהמלאי (אין מידות זמינות)';
    return;
  }
  if (this.selectedSize === null) {
    this.errorMsg = 'בחרי מידה לפני הוספה לסל';
    return;
  }
const stock = this.getSelectedStock();
if (this.quantity > stock) {
  this.msg.add({
    severity: 'warn',
    summary: 'המלאי מוגבל',
    detail: `נשארו רק ${stock} יחידות במידה הזו`,
    life: 2500,
  });
  this.quantity = stock; // לא חובה, אבל מומלץ שיתאים אוטומטית
  return;
}
  this.cartStorage.addToCart(this.product, this.quantity, this.selectedSize);
}
}