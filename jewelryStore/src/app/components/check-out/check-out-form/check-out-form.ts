import { Component ,Input,Output} from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-check-out-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-out-form.html',
  styleUrl: './check-out-form.css',
})
export class CheckOutForm {
 currentStep = 1;

  constructor(public checkoutService: CheckoutService) {}

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
}
