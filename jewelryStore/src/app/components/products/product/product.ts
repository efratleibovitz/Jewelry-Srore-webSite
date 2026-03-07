import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { CartStorage } from '../../../services/cart-storage.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, DialogModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  @Input() product!: any;

  added = false;

  // dialog state
  sizeDialogVisible = false;
  sizeOptions: { size: number; amount: number }[] = [];
  selectedSize: number | null = null;

  // נשמור את "המוצר המלא" שהגיע מהשרת כדי להוסיף לסל ממנו
  private sizeDialogProduct: any = null;

  constructor(
    private cartStorage: CartStorage,
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
    private msg: MessageService
  ) {}

  // private getAvailableSizes(p: any): { size: number; amount: number }[] {
  //   const sizes = (p?.sizes ?? []) as any[];
  //   return sizes
  //     .map(s => ({ size: Number(s.size), amount: Number(s.amount ?? 0) }))
  //     .filter(s => Number.isFinite(s.size) && s.amount > 0);
  // }
private getAvailableSizes(p: any): { size: number; amount: number }[] {
  const sizes = (p?.sizes ?? []) as any[];
  return sizes
    .map(s => ({
      size: Number(s.productSize ?? s.ProductSize ?? s.size),
      amount: Number(s.amount ?? s.Amount ?? 0),
    }))
    .filter(x => Number.isFinite(x.size) && x.amount > 0);
}
  addToCart(): void {
 
    const productId = Number(this.product?.id ?? this.product?.productId);
    if (!productId) return;

    // אם sizes כבר קיימים על האובייקט מהרשימה
    if (Array.isArray(this.product?.sizes)) {
      this.handleSizesAndAdd(this.product);
      return;
    }

    // אחרת: מביאים מוצר מלא מהשרת (עם sizes)
    this.productService.getProductById(productId).pipe(take(1)).subscribe({
      
      next: (fullProduct: any) => {
  
    this.handleSizesAndAdd(fullProduct);
  },

      error: () => {
        this.msg.add({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא הצלחתי לטעון מידות למוצר',
          life: 2500,
        });
      },
    });
  }

  private handleSizesAndAdd(p: any): void {

    const avail = this.getAvailableSizes(p);

    // 1) אין מידות זמינות
    if (avail.length === 0) {
      this.msg.add({
        severity: 'error',
        summary: 'אזל מהמלאי',
        detail: 'אין מידות זמינות למוצר הזה',
        life: 2500,
      });
      return;
    }

    // 2) מידה אחת -> מוסיפים אוטומטית
    if (avail.length === 1) {
      this.cartStorage.addToCart(p, 1, avail[0].size);

      this.msg.add({
        severity: 'warn',
        summary: 'נוסף לסל',
        detail: `מידה ${avail[0].size}`,
        life: 2000,
      });

      this.flashAdded();
      return;
    }

    // 3) כמה מידות -> פותחים דיאלוג
    this.sizeDialogProduct = p;
    this.sizeOptions = avail;
    this.selectedSize = null;
    this.sizeDialogVisible = true;
  }

  confirmSize(): void {
    if (this.selectedSize === null) return;

    const p = this.sizeDialogProduct ?? this.product;

    this.cartStorage.addToCart(p, 1, this.selectedSize);
    this.sizeDialogVisible = false;

    this.msg.add({
      severity: 'success',
      summary: 'נוסף לסל',
      detail: `מידה ${this.selectedSize}`,
      life: 2000,
    });

    this.flashAdded();
  }

  private flashAdded(): void {
    this.added = true;
    setTimeout(() => {
      this.added = false;
      this.cdr.detectChanges();
    }, 1000);
  }
}