import { Component ,Input,Output} from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-out-form.html',
  styleUrl: './check-out-form.css',
})
export class CheckOutForm {
 currentStep = 1;
 orderSuccess$ ;
 private successSub?: Subscription;
  constructor(public checkoutService: CheckoutService,private router: Router) {
    this.orderSuccess$ = this.checkoutService.orderSuccess;
      this.successSub = this.orderSuccess$.subscribe(success => {
    if (success) {
      setTimeout(() => {
        this.checkoutService.closeSuccessPopup();
      }, 2500); // ⏳ נסגר אחרי 2.5 שניות
    }
  });
  }

  nextStep(step: number) {
    // בדיקה אם השלב הקודם תקין לפני מעבר
    if (step === 2 && this.checkoutService.checkoutForm.get('personalDetails')?.valid) {
      this.currentStep = 2;
    } else if (step === 3 && this.checkoutService.checkoutForm.get('shipping')?.valid) {
      this.currentStep = 3;
    }
  }

submitOrder() {
  this.checkoutService.submitOrder();
}
  closeSuccess() {
    this.checkoutService.closeSuccessPopup();
  }
}
