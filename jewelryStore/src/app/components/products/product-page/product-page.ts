import { Component } from '@angular/core';
import { ProductPageService } from '../../../services/productPage.service';
import { ProductArr } from '../product-arr/product-arr';
import { Header } from '../../header/header';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ייבוא הראוטר

@Component({
  selector: 'app-product-page',
  imports: [CommonModule,FormsModule,SliderModule,Header,ProductArr],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {

  viewProducts: any[] = [];
  
  // מצבי תצוגה
  isOptionsOpen = false;
  isColorOpen = false;
  isPriceOpen = false;
  isStyleOpen = false;
  isCategoryOpen = false;

  // ערכי פילטרים
  sortValue: 'price_asc' | 'price_desc' | 'new' | null = null;
  selectedColor: 'silver' | 'gold' | 'colorful' | null = null;
  selectedStyle: 'classic' | 'trendy' | 'pearls' | 'studio' | null = null;
  selectedCategory: 'necklaces' | 'earrings' | 'bracelets' | 'rings' | null = null;
  priceRange: number[] = [0, 3000];
  minPossible = 0;   // הערך הכי נמוך בסליידר
  maxPossible = 3000; // הערך הכי גבוה בסליידר
  constructor(private ProductPageService: ProductPageService,private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    // טעינת המוצרים דרך פונקציית הסינון בסרוויס
    const filters = {
      category: this.selectedCategory,
      color: this.selectedColor,
      style: this.selectedStyle,
      priceRange: this.priceRange,
      sortValue: this.sortValue
    };
    this.viewProducts = this.ProductPageService.getFilteredProducts(filters);
  }

  // פונקציות ממשק
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
  toggleStyle() { this.isStyleOpen = !this.isStyleOpen; }
  toggleCategory() { this.isCategoryOpen = !this.isCategoryOpen; }

  applyFilter() {
    this.loadProducts();
    this.closeOptions();
  }

  clearAll() {
    this.sortValue = null;
    this.selectedColor = null;
    this.selectedStyle = null;
    this.selectedCategory = null;
    this.priceRange = [0, 3000];
    this.loadProducts();
  }
  
  applySort() {
  this.loadProducts(); // מפעיל את הטעינה מחדש שכוללת מיון
  this.closeOptions(); // סוגר את הפאנל
  }
}
