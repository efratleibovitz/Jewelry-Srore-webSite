// // // import { Component } from '@angular/core';
// // // import { ProductPageService } from '../../../services/productPage.service';
// // // import { ProductArr } from '../product-arr/product-arr';
// // // import { Header } from '../../header/header';
// // // import { SliderModule } from 'primeng/slider';
// // // import { FormsModule } from '@angular/forms';
// // // import { CommonModule } from '@angular/common';
// // // import { ActivatedRoute } from '@angular/router';

// // // @Component({
// // //   selector: 'app-product-page',
// // //   imports: [CommonModule, FormsModule, SliderModule, Header, ProductArr],
// // //   templateUrl: './product-page.html',
// // //   styleUrl: './product-page.css',
// // // })
// // // export class ProductPage {
// // //   viewProducts: any[] = [];

// // //   // UI states
// // //   isOptionsOpen = false;
// // //   isColorOpen = false;
// // //   isPriceOpen = false;
// // //   isStyleOpen = false;
// // //   isCategoryOpen = false;

// // //   // filters (UI)
// // //   sortValue: 'price_asc' | 'price_desc' | 'new' | null = null;
// // //   selectedColor: 'silver' | 'gold' | 'colorful' | null = null;
// // //   selectedStyle: 'classic' | 'trendy' | 'pearls' | 'studio' | null = null;
// // //   selectedCategory: 'necklaces' | 'earrings' | 'bracelets' | 'rings' | null = null;

// // //   priceRange: number[] = [0, 3000];
// // //   minPossible = 0;
// // //   maxPossible = 3000;

// // //   // ✅ מה שיגיע מה-Header / URL
// // //   categoryIdFromUrl: number | null = null;
// // //   studioFromUrl: boolean | null = null;
// // //   constructor(
// // //     private productPageService: ProductPageService,
// // //     private route: ActivatedRoute
// // //   ) {}

// // //   ngOnInit(): void {
// // //     // ✅ כל פעם שה-URL משתנה (למשל לחיצה ב-Header)
// // // this.route.queryParamMap.subscribe(params => {
// // //   const cid = params.get('categoryId');
// // //   this.categoryIdFromUrl = cid ? Number(cid) : null;

// // //   const studio = params.get('isStudio');
// // //   this.studioFromUrl = studio === null ? null : (studio === 'true' || studio === '1');

// // //   this.loadProductsFromApi();
// // // });
// // //   }

// // //   loadProductsFromApi() {
// // //     const query = this.buildApiQuery();
// // //     this.productPageService.getProductsFromApi(query).subscribe({
// // //       next: (products) => this.viewProducts = products,
// // //       error: (err) => console.error('Failed to load products', err)
// // //     });
// // //   }
// // // private buildApiQuery() {
// // //   const styleFlags = {
// // //     isClassic: this.selectedStyle === 'classic' ? true : null,
// // //     isTrendy: this.selectedStyle === 'trendy' ? true : null,
// // //     isPearls: this.selectedStyle === 'pearls' ? true : null,

// // //     // ✅ אם הגיע מה-Header דרך URL, זה קודם
// // //     isStudio: this.studioFromUrl ?? (this.selectedStyle === 'studio' ? true : null),
// // //   };

// // //   const sortMode =
// // //     this.sortValue === 'price_asc' ? 'low_to_high' :
// // //     this.sortValue === 'price_desc' ? 'high_to_low' :
// // //     this.sortValue === 'new' ? 'date' :
// // //     null;

// // //   return {
// // //     categoryId: this.categoryIdFromUrl,
// // //     color: this.selectedColor,
// // //     minPrice: this.priceRange?.[0] ?? null,
// // //     maxPrice: this.priceRange?.[1] ?? null,
// // //     justOnline: null,
// // //     ...styleFlags,
// // //     sortMode
// // //   };
// // // }

// // //   // UI functions
// // //   openOptions() {
// // //     this.isOptionsOpen = true;
// // //     document.body.style.overflow = 'hidden';
// // //   }

// // //   closeOptions() {
// // //     this.isOptionsOpen = false;
// // //     document.body.style.overflow = '';
// // //   }

// // //   toggleColor() { this.isColorOpen = !this.isColorOpen; }
// // //   togglePrice() { this.isPriceOpen = !this.isPriceOpen; }
// // //   toggleStyle() { this.isStyleOpen = !this.isStyleOpen; }
// // //   toggleCategory() { this.isCategoryOpen = !this.isCategoryOpen; }

// // //   applyFilter() {
// // //     this.loadProductsFromApi();
// // //     this.closeOptions();
// // //   }

// // //   clearAll() {
// // //     this.sortValue = null;
// // //     this.selectedColor = null;
// // //     this.selectedStyle = null;
// // //     this.selectedCategory = null;
// // //     this.priceRange = [0, 3000];
// // //     this.loadProductsFromApi();
// // //   }

// // //   applySort() {
// // //     this.loadProductsFromApi();
// // //     this.closeOptions();
// // //   }
// // // }
// // import { Component } from '@angular/core';
// // import { ProductPageService } from '../../../services/productPage.service';
// // import { ProductArr } from '../product-arr/product-arr';
// // import { Header } from '../../header/header';
// // import { SliderModule } from 'primeng/slider';
// // import { FormsModule } from '@angular/forms';
// // import { CommonModule } from '@angular/common';
// // import { ActivatedRoute } from '@angular/router';

// // @Component({
// //   selector: 'app-product-page',
// //   imports: [CommonModule, FormsModule, SliderModule, Header, ProductArr],
// //   templateUrl: './product-page.html',
// //   styleUrl: './product-page.css',
// // })
// // export class ProductPage {
// //   viewProducts: any[] = [];

// //   // UI states
// //   isOptionsOpen = false;
// //   isColorOpen = false;
// //   isPriceOpen = false;
// //   isStyleOpen = false;
// //   isCategoryOpen = false;

// //   // filters (UI)
// //   sortValue: 'price_asc' | 'price_desc' | 'new' | null = null;
// //   selectedColor: 'silver' | 'gold' | 'colorful' | null = null;
// //   // selectedStyle: 'classic' | 'trendy' | 'pearls' | 'studio' | null = null;
// //   selectedStyles: string[] = [];
// //   selectedCategory: 'necklaces' | 'earrings' | 'bracelets' | 'rings' | null = null;

// //   priceRange: number[] = [0, 3000];
// //   minPossible = 0;
// //   maxPossible = 3000;

// //   // ✅ מה שיגיע מה-Header / URL
// //   categoryIdFromUrl: number | null = null;
// //   studioFromUrl: boolean | null = null;

// //   constructor(
// //     private productPageService: ProductPageService,
// //     private route: ActivatedRoute
// //   ) {}

// //   // ✅ המרה לאותם ערכים שנמצאים ב-DB (עברית)
// //   private colorToHebrew(c: 'silver' | 'gold' | 'colorful' | null): string | null {
// //     if (!c) return null;
// //     return c === 'silver' ? 'כסף'
// //          : c === 'gold' ? 'זהב'
// //          : 'צבעוני';
// //   }

// //   ngOnInit(): void {
// //     // ✅ כל פעם שה-URL משתנה
// //     this.route.queryParamMap.subscribe(params => {
// //       const cid = params.get('categoryId');
// //       this.categoryIdFromUrl = cid ? Number(cid) : null;

// //       const studio = params.get('isStudio');
// //       this.studioFromUrl = studio === null ? null : (studio === 'true' || studio === '1');

// //       // ✅ צבע מה-URL (מגיע מהדף בית)
// //       const color = params.get('color');
// //       this.selectedColor =
// //         color === 'silver' || color === 'gold' || color === 'colorful'
// //           ? color
// //           : null;

// //       this.loadProductsFromApi();
// //     });
// //   }

// //   loadProductsFromApi() {
// //     const query = this.buildApiQuery();
// //     this.productPageService.getProductsFromApi(query).subscribe({
// //       next: (products) => this.viewProducts = products,
// //       error: (err) => console.error('Failed to load products', err)
// //     });
// //   }

// //   private buildApiQuery() {
// //     const styleFlags = {
// //       isClassic: this.selectedStyle === 'classic' ? true : null,
// //       isTrendy: this.selectedStyle === 'trendy' ? true : null,
// //       isPearls: this.selectedStyle === 'pearls' ? true : null,

// //       // ✅ אם הגיע מה-Header דרך URL, זה קודם
// //       isStudio: this.studioFromUrl ?? (this.selectedStyle === 'studio' ? true : null),
// //     };

// //     const sortMode =
// //       this.sortValue === 'price_asc' ? 'low_to_high' :
// //       this.sortValue === 'price_desc' ? 'high_to_low' :
// //       this.sortValue === 'new' ? 'date' :
// //       null;

// //     return {
// //       categoryId: this.categoryIdFromUrl,

// //       // ✅ נשלח לשרת בעברית כי ככה שמור ב-DB
// //       color: this.colorToHebrew(this.selectedColor),

// //       minPrice: this.priceRange?.[0] ?? null,
// //       maxPrice: this.priceRange?.[1] ?? null,
// //       justOnline: null,
// //       ...styleFlags,
// //       sortMode
// //     };
// //   }

// //   // UI functions
// //   openOptions() {
// //     this.isOptionsOpen = true;
// //     document.body.style.overflow = 'hidden';
// //   }

// //   closeOptions() {
// //     this.isOptionsOpen = false;
// //     document.body.style.overflow = '';
// //   }

// //   toggleColor() { this.isColorOpen = !this.isColorOpen; }
// //   togglePrice() { this.isPriceOpen = !this.isPriceOpen; }
// //   // toggleStyle() { this.isStyleOpen = !this.isStyleOpen; }
// //   toggleStyle(style: string) {
// //   if (this.selectedStyles.includes(style)) {
// //     this.selectedStyles = this.selectedStyles.filter(s => s !== style);
// //   } else {
// //     this.selectedStyles.push(style);
// //   }
// // }
// //   toggleCategory() { this.isCategoryOpen = !this.isCategoryOpen; }

// //   applyFilter() {
// //     this.loadProductsFromApi();
// //     this.closeOptions();
// //   }

// //   clearAll() {
// //     this.sortValue = null;
// //     this.selectedColor = null;
// //     this.selectedStyles = [];
// //     this.selectedCategory = null;
// //     this.priceRange = [0, 3000];
// //     this.loadProductsFromApi();
// //   }

// //   applySort() {
// //     this.loadProductsFromApi();
// //     this.closeOptions();
// //   }
// // }
// import { Component } from '@angular/core';
// import { ProductPageService } from '../../../services/productPage.service';
// import { ProductArr } from '../product-arr/product-arr';
// import { Header } from '../../header/header';
// import { SliderModule } from 'primeng/slider';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-product-page',
//   imports: [CommonModule, FormsModule, SliderModule, Header, ProductArr],
//   templateUrl: './product-page.html',
//   styleUrl: './product-page.css',
// })
// export class ProductPage {
//   viewProducts: any[] = [];

//   isOptionsOpen = false;
//   isColorOpen = false;
//   isPriceOpen = false;
//   isStyleOpen = false;
//   isCategoryOpen = false;

//   sortValue: 'price_asc' | 'price_desc' | 'new' | null = null;
//   selectedColor: 'silver' | 'gold' | 'colorful' | null = null;
//   selectedStyles: string[] = [];
//   selectedCategory: 'necklaces' | 'earrings' | 'bracelets' | 'rings' | null = null;

//   priceRange: number[] = [0, 3000];
//   minPossible = 0;
//   maxPossible = 3000;

//   categoryIdFromUrl: number | null = null;
//   studioFromUrl: boolean | null = null;

//   constructor(
//     private productPageService: ProductPageService,
//     private route: ActivatedRoute
//   ) {}

//   private colorToHebrew(c: 'silver' | 'gold' | 'colorful' | null): string | null {
//     if (!c) return null;
//     if (c === 'silver') return 'כסף';
//     if (c === 'gold') return 'זהב';
//     return 'צבעוני';
//   }

//   private hasStyle(style: string): boolean {
//     return this.selectedStyles.includes(style);
//   }

//   ngOnInit(): void {
//     this.route.queryParamMap.subscribe(params => {
//       const cid = params.get('categoryId');
//       this.categoryIdFromUrl = cid ? Number(cid) : null;

//       const studio = params.get('isStudio');
//       this.studioFromUrl = studio === null ? null : (studio === 'true' || studio === '1');

//       const color = params.get('color');
//       this.selectedColor =
//         color === 'silver' || color === 'gold' || color === 'colorful'
//           ? color
//           : null;

//       this.loadProductsFromApi();
//     });
//   }

//   loadProductsFromApi() {
//     const query = this.buildApiQuery();
//     this.productPageService.getProductsFromApi(query).subscribe({
//       next: products => (this.viewProducts = products),
//       error: err => console.error('Failed to load products', err),
//     });
//   }

//   private buildApiQuery() {
//     const styleFlags = {
//       isClassic: this.hasStyle('classic') ? true : null,
//       isTrendy: this.hasStyle('trendy') ? true : null,
//       isPearls: this.hasStyle('pearls') ? true : null,
//       isStudio: this.studioFromUrl ?? (this.hasStyle('studio') ? true : null),
//     };

//     const sortMode =
//       this.sortValue === 'price_asc'
//         ? 'low_to_high'
//         : this.sortValue === 'price_desc'
//         ? 'high_to_low'
//         : this.sortValue === 'new'
//         ? 'date'
//         : null;

//     return {
//       categoryId: this.categoryIdFromUrl,
//       color: this.colorToHebrew(this.selectedColor),
//       minPrice: this.priceRange?.[0] ?? null,
//       maxPrice: this.priceRange?.[1] ?? null,
//       justOnline: null,
//       ...styleFlags,
//       sortMode,
//     };
//   }

//   openOptions() {
//     this.isOptionsOpen = true;
//     document.body.style.overflow = 'hidden';
//   }

//   closeOptions() {
//     this.isOptionsOpen = false;
//     document.body.style.overflow = '';
//   }

//   toggleColor() {
//     this.isColorOpen = !this.isColorOpen;
//   }

//   togglePrice() {
//     this.isPriceOpen = !this.isPriceOpen;
//   }

//   toggleStyleSection() {
//     this.isStyleOpen = !this.isStyleOpen;
//   }

//   toggleCategory() {
//     this.isCategoryOpen = !this.isCategoryOpen;
//   }

//   toggleStyleChoice(style: string) {
//     if (this.selectedStyles.includes(style)) {
//       this.selectedStyles = this.selectedStyles.filter(s => s !== style);
//     } else {
//       this.selectedStyles = [...this.selectedStyles, style];
//     }
//   }

//   applyFilter() {
//     this.loadProductsFromApi();
//     this.closeOptions();
//   }

//   clearAll() {
//     this.sortValue = null;
//     this.selectedColor = null;
//     this.selectedStyles = [];
//     this.selectedCategory = null;
//     this.priceRange = [0, 3000];
//     this.loadProductsFromApi();
//   }

//   applySort() {
//     this.loadProductsFromApi();
//     this.closeOptions();
//   }
// }
import { Component } from '@angular/core';
import { ProductPageService } from '../../../services/productPage.service';
import { ProductArr } from '../product-arr/product-arr';
import { Header } from '../../header/header';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, FormsModule, SliderModule, Header, ProductArr],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {
  viewProducts: any[] = [];

  // UI states
  isOptionsOpen = false;
  isColorOpen = false;
  isPriceOpen = false;
  isStyleOpen = false;
  isCategoryOpen = false;

  // filters (UI)
  sortValue: 'price_asc' | 'price_desc' | 'new' | null = null;
  selectedColor: 'silver' | 'gold' | 'colorful' | null = null;
  selectedStyles: string[] = [];
  selectedCategory: 'necklaces' | 'earrings' | 'bracelets' | 'rings' | null = null;

  priceRange: number[] = [0, 3000];
  minPossible = 0;
  maxPossible = 3000;

  pagedProducts: any[] = [];
currentPage: number = 1; // ערך ברירת מחדל

  // מה שיגיע מה-Header / URL
  categoryIdFromUrl: number | null = null;
  studioFromUrl: boolean | null = null;

  // ✅ חובה להתאים ל-CategoryId אמיתי אצלך
  private categoryMap: Record<'necklaces' | 'earrings' | 'bracelets' | 'rings', number> = {
    necklaces: 1,
    earrings: 4,
    bracelets: 2,
    rings: 3,
  };

  constructor(
    private productPageService: ProductPageService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  private colorToHebrew(c: 'silver' | 'gold' | 'colorful' | null): string | null {
    if (!c) return null;
    if (c === 'silver') return 'כסף';
    if (c === 'gold') return 'זהב';
    return 'צבעוני';
  }

  private hasStyle(style: string): boolean {
    return this.selectedStyles.includes(style);
  }

  private getCategoryIdForQuery(): number | null {
    // אם הגיע מה-URL זה קודם
    if (this.categoryIdFromUrl !== null) return this.categoryIdFromUrl;

    // אחרת לפי הבחירה בפאנל
    if (!this.selectedCategory) return null;
    return this.categoryMap[this.selectedCategory] ?? null;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const cid = params.get('categoryId');
      this.categoryIdFromUrl = cid ? Number(cid) : null;

      const studio = params.get('isStudio');
      this.studioFromUrl = studio === null ? null : (studio === 'true' || studio === '1');

      const color = params.get('color');
      this.selectedColor =
        color === 'silver' || color === 'gold' || color === 'colorful'
          ? color
          : null;

      this.loadProductsFromApi();
    });
  }
//   ngOnInit(): void {
//   this.route.queryParamMap.subscribe(params => {
//     // 1. קודם כל - איפוס סינונים קודמים כדי שלא תהיה התנגשות
//     this.selectedCategory = null; 
//     this.selectedStyles = [];
//     this.selectedColor = null;

//     // 2. שליפת הנתונים מה-URL החדש
//     const cid = params.get('categoryId');
//     this.categoryIdFromUrl = cid ? Number(cid) : null;

//     const studio = params.get('isStudio');
//     this.studioFromUrl = (studio === 'true' || studio === '1');

//     // 3. טעינת המוצרים
//     this.loadProductsFromApi();
//   });
// }

  // loadProductsFromApi() {
  //   const query = this.buildApiQuery();
  //   this.productPageService.getProductsFromApi(query).subscribe({
  //     next: products => (this.viewProducts = products),
  //     error: err => console.error('Failed to load products', err),
  //   });
  // }
loadProductsFromApi() {
  const query = this.buildApiQuery();
  this.productPageService.getProductsFromApi(query).subscribe({
    next: (products) => {
      // ה-DB שלח מוצרים? אנחנו פשוט מציגים אותם
      this.viewProducts = products;
      this.pagedProducts = products; 

      // אומרים לאנגולר לצייר אותם מיד
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err),
  });
}

  private buildApiQuery() {
    const sortMode =
      this.sortValue === 'price_asc' ? 'low_to_high' :
      this.sortValue === 'price_desc' ? 'high_to_low' :
      this.sortValue === 'new' ? 'date' :
      null;

    return {
      categoryId: this.getCategoryIdForQuery(),
      color: this.colorToHebrew(this.selectedColor),
      minPrice: this.priceRange?.[0] ?? null,
      maxPrice: this.priceRange?.[1] ?? null,
      justOnline: null,

      isClassic: this.hasStyle('classic') ? true : null,
      isTrendy: this.hasStyle('trendy') ? true : null,
      isPearls: this.hasStyle('pearls') ? true : null,

      // URL קודם (אם הגיע מהheader), אחרת לפי בחירה בפאנל
      isStudio: this.studioFromUrl ?? (this.hasStyle('studio') ? true : null),

      sortMode
    };
  }

  // UI functions
  openOptions() {
    this.isOptionsOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeOptions() {
    this.isOptionsOpen = false;
    document.body.style.overflow = '';
  }

  toggleColor() { this.isColorOpen = !this.isColorOpen; }
  togglePrice() { this.isPriceOpen = !this.isPriceOpen; }
  toggleStyleSection() { this.isStyleOpen = !this.isStyleOpen; }
  toggleCategory() { this.isCategoryOpen = !this.isCategoryOpen; }

  toggleStyleChoice(style: string) {
    if (this.selectedStyles.includes(style)) {
      this.selectedStyles = this.selectedStyles.filter(s => s !== style);
    } else {
      this.selectedStyles = [...this.selectedStyles, style];
    }
  }

  applyFilter() {
    this.loadProductsFromApi(); // מסנן + ממיין אם נבחר מיון
    this.closeOptions();
  }

  applySort() {
    this.loadProductsFromApi(); // ממיין את המסונן (כי הסינון נשמר ב-state)
    this.closeOptions();
  }

  clearAll() {
    this.sortValue = null;
    this.selectedColor = null;
    this.selectedStyles = [];
    this.selectedCategory = null;
    this.priceRange = [0, 3000];

    // לא מאפסים URL כדי לא לשבור ניווט מה-header
    // this.categoryIdFromUrl = null;
    // this.studioFromUrl = null;

    this.loadProductsFromApi();
  }
}