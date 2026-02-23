import { Component , Input} from '@angular/core';
import { CartStorage } from '../../../services/cart-storage.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
   @Input() product!: any;
    added = false;
    constructor(private cartStorage: CartStorage,private cdr: ChangeDetectorRef) {}
    addToCart(): void {
   
      this.cartStorage.addToCart(this.product);
      this.added = true;
  
      setTimeout(() => {
        this.added = false;
        this.cdr.detectChanges();

      }, 1000);
    }
}
