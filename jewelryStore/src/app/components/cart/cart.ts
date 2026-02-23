import { Component ,Input,Output,EventEmitter,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CartStorage } from '../../services/cart-storage.service';
import { CartItem } from '../../models/cart.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [CommonModule, ButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
   cartVisible = true;

  
  @Input() cartItems: CartItem[] = [];


  constructor(
    private cartStorage: CartStorage, 
    private router: Router
  ) {}
  // ngOnInit(): void {
  //   this.cartItems = this.cartStorage.getCart();
  // }

// פונקציה חדשה למעבר לתשלום
  goToCheckout() {
    this.router.navigate(['/checkout']);
    this.close(); // סוגר את חלונית העגלה בזמן המעבר
  }

inc(it: CartItem) { it.quantity++; 
  this.cartStorage.saveCart(this.cartItems);
}
dec(it: CartItem) { if (it.quantity > 1) it.quantity--;
  this.cartStorage.saveCart(this.cartItems);
 }
remove(it: CartItem) { 
    this.cartItems = this.cartItems.filter(item => item.id !== it.id);
  this.cartStorage.removeFromCart(it.id);
}

get totalItems(): number {
  return this.cartItems.reduce((sum, it) => sum + it.quantity, 0);
}

get totalPrice(): number {
  return this.cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
}

get freeShippingEligible(): boolean {
  return this.totalPrice >= 250;
}


  @Output() closeCart = new EventEmitter<void>();

  close() {
    this.closeCart.emit();
  }
}
