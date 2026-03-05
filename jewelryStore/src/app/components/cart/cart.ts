import { Component ,Input,Output,EventEmitter,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CartStorage } from '../../services/cart-storage.service';
import { CartItem } from '../../models/cart.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-cart',
  imports: [CommonModule, ButtonModule,FormsModule ,ToastModule],
  providers: [MessageService],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
   cartVisible = true;

  
  @Input() cartItems: CartItem[] = [];


  constructor(
    private cartStorage: CartStorage, 
    private router: Router,
    private msg: MessageService
  ) {}
  // ngOnInit(): void {
  //   this.cartItems = this.cartStorage.getCart();
  // }

// פונקציה חדשה למעבר לתשלום
  goToCheckout() {
    this.router.navigate(['/checkout']);
    this.close(); // סוגר את חלונית העגלה בזמן המעבר
  }

// inc(it: CartItem) { it.quantity++; 
//   this.cartStorage.saveCart(this.cartItems);
// }
inc(it: CartItem) {
  const max = Number(it.maxAmount ?? 0);

  if (max > 0 && it.quantity >= max) {
    this.msg.add({
      severity: 'warn',
      summary: 'המלאי מוגבל',
      detail: `אפשר להזמין עד ${max} יחידות במידה הזו`,
      life: 2200,
    });
    return;
  }

  it.quantity++;
  this.cartStorage.saveCart(this.cartItems);
}
dec(it: CartItem) { if (it.quantity > 1) it.quantity--;
  this.cartStorage.saveCart(this.cartItems);
 }
remove(it: CartItem) { 
    this.cartItems = this.cartItems.filter(item => item.productId !== it.productId);
this.cartStorage.removeFromCart(it.productId, it.size ?? null);
   this.cartItems = this.cartStorage.getCart();

}

get totalItems(): number {
  return this.cartItems.reduce((sum, it) => sum + it.quantity, 0);
}

get totalPrice(): number {
  return this.cartItems.reduce((sum, it) => sum + it.productPrice * it.quantity, 0);
}

get freeShippingEligible(): boolean {
  return this.totalPrice >= 250;
}


  @Output() closeCart = new EventEmitter<void>();

  close() {
    this.closeCart.emit();
  }
}
