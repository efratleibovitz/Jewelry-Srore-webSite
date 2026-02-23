import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  public checkoutForm: FormGroup;

  // רשימת הסניפים לבחירה
  public branches: string[] = [
    'אשדוד - סימול',
    'תל אביב - עזריאלי',
    'ירושלים - קניון מלחה',
    'ראשון לציון - קניון הזהב'
  ];

  // סכום הביניים של המוצרים (לדוגמה 139 ש"ח כפי שמופיע בתמונה שלך)
  private subtotal$ = new BehaviorSubject<number>(139);
  subtotal = this.subtotal$.asObservable();

  // BehaviorSubject לעלות המשלוח
  private shippingCost$ = new BehaviorSubject<number>(0);
  shippingCost = this.shippingCost$.asObservable();

  // Observable שמחשב את סך הכל (מוצרים + משלוח) בזמן אמת
  total$ = combineLatest([this.subtotal$, this.shippingCost$]).pipe(
    map(([subtotal, shipping]) => subtotal + shipping)
  );
constructor(private fb: FormBuilder) {
    // 1. הגדרת מבנה הטופס
    this.checkoutForm = this.fb.group({
      personalDetails: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        notes: ['']
      }),
      shipping: this.fb.group({
        method: ['courier', Validators.required], // ברירת מחדל: שליח עד הבית
        branch: [''] // לא חובה כשזה שליח
      }),
      payment: this.fb.group({
        method: ['credit-card', Validators.required],
        cardHolder: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
      })
    });

    // 2. הפעלת הלוגיקה הראשונית (כדי שהמחיר ופס ההתקדמות יחושבו מיד)
    const initialMethod = this.checkoutForm.get('shipping.method')?.value;
    this.updateShippingLogic(initialMethod);

    // 3. האזנה לשינויים עתידיים בשיטת המשלוח
    this.checkoutForm.get('shipping.method')?.valueChanges.subscribe(method => {
      this.updateShippingLogic(method);
    });
  }
  // פונקציה לעדכון עלות המשלוח והולידציות של הסניפים
  private updateShippingLogic(method: string) {
    const currentSubtotal = this.subtotal$.value;
    const branchControl = this.checkoutForm.get('shipping.branch');
    let cost = 0;

    if (method === 'courier') {
      // לוגיקה: שליח עד הבית 30 ש"ח, חינם מעל 250 ש"ח
      cost = currentSubtotal >= 250 ? 0 : 30;
      branchControl?.clearValidators();
    } 
    else if (method === 'point') {
      // נקודת איסוף - 14 ש"ח
      cost = 14;
      branchControl?.clearValidators();
    } 
    else if (method === 'pickup') {
      // איסוף מסניף - תמיד חינם
      cost = 0;
      branchControl?.setValidators([Validators.required]);
    }

    branchControl?.updateValueAndValidity();
    this.shippingCost$.next(cost);
  }

  // פונקציה לעדכון סכום הביניים (לשימוש אם מוסיפים מוצרים בעגלה)
  updateSubtotal(amount: number) {
    this.subtotal$.next(amount);
    // הרצת הלוגיקה מחדש כדי לבדוק אם כעת מגיע לה משלוח חינם
    const currentMethod = this.checkoutForm.get('shipping.method')?.value;
    this.updateShippingLogic(currentMethod);
  }

  submitOrder() {
    if (this.checkoutForm.valid) {
      const finalData = this.checkoutForm.value;
      console.log('הזמנה בוצעה בהצלחה!', finalData);
      // כאן יבוא הניווט לדף הצלחה
    } else {
      this.checkoutForm.markAllAsTouched();
      alert('נא למלא את כל שדות החובה לפני אישור ההזמנה');
      this.findFirstInvalidStep();
    }
  }

  private findFirstInvalidStep() {
    if (this.checkoutForm.get('personalDetails')?.invalid) return 1;
    if (this.checkoutForm.get('shipping')?.invalid) return 2;
    if (this.checkoutForm.get('payment')?.invalid) return 3;
    return 1;
  }
}