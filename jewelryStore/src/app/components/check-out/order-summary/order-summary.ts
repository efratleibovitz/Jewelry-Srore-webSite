import { Component,OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'; 


@Component({
  selector: 'app-order-summary',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummary implements OnInit{
subtotal = 139;
  total$!: Observable<number>; // Observable שיחזיק את הסכום הסופי

  constructor(public checkoutService: CheckoutService) {}

  ngOnInit() {
    // אנחנו יוצרים "צינור" שמחבר את מחיר המשלוח למחיר המוצר
    this.total$ = this.checkoutService.shippingCost.pipe(
      map(shipping => this.subtotal + shipping)
    );
  }
}
