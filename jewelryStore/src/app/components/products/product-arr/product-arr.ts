import { Component,Input } from '@angular/core';
import { Product } from '../product/product';

@Component({
  selector: 'app-product-arr',
  standalone: true,   
  imports: [Product],
  templateUrl: './product-arr.html',
  styleUrl: './product-arr.css',
})
export class ProductArr {
  @Input() products: any[] = [];

  pagedProducts: any[] = [];

  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 0;

  ngOnChanges() {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.updatePage();
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedProducts = this.products.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}