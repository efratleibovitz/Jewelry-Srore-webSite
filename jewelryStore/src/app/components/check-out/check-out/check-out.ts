import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {OrderSummary} from '../order-summary/order-summary';
// ייבוא הקומפוננטות שיצרת (וודאי שהנתיב נכון אצלך)
import { CheckOutForm } from '../check-out-form/check-out-form';

@Component({
  selector: 'app-check-out',
  imports: [CommonModule, CheckOutForm, OrderSummary, ReactiveFormsModule],
  templateUrl: './check-out.html',
  styleUrl: './check-out.css',
})
export class CheckOut implements OnInit {
  checkoutForm!: FormGroup;
  currentStep: number = 1; // שולט איזה אקורדיון פתוח

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      // שלב 1: פרטים אישיים
      personalDetails: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
      }),
      // שלב 2: שיטת משלוח
      shippingMethod: this.fb.group({
        method: ['pickup', Validators.required], // ערך ברירת מחדל
        branch: ['ashdod']
      }),
      // שלב 3: תשלום
      paymentMethod: this.fb.group({
        type: ['', Validators.required]
      })
    });
  }

  // פונקציית עזר למעבר שלבים
  nextStep(step: number) {
    const prevGroup = this.getGroupAtStep(step - 1);
    
    // מאפשר מעבר רק אם השלב הקודם תקין
    if (prevGroup && prevGroup.valid) {
      this.currentStep = step;
    } else if (prevGroup) {
      prevGroup.markAllAsTouched(); // מסמן שגיאות אם לא תקין
    }
  }

  getGroupAtStep(step: number): FormGroup | null {
    if (step === 1) return this.checkoutForm.get('personalDetails') as FormGroup;
    if (step === 2) return this.checkoutForm.get('shippingMethod') as FormGroup;
    return null;
  }
}
