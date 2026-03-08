// // import { Injectable } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { BehaviorSubject, combineLatest, map } from 'rxjs';
// // import { CartStorage } from './cart-storage.service';
// // import { HttpClient } from '@angular/common/http';
// // import { environment } from '../../environments/environment'; 
// // @Injectable({ providedIn: 'root' })
// // export class CheckoutService {
// //   public checkoutForm: FormGroup;

// //   // רשימת הסניפים לבחירה
// //   public branches: string[] = [
// //     'אשדוד - סימול',
// //     'תל אביב - עזריאלי',
// //     'ירושלים - קניון מלחה',
// //     'ראשון לציון - קניון הזהב'
// //   ];

// //   // סכום הביניים של המוצרים (לדוגמה 139 ש"ח כפי שמופיע בתמונה שלך)
// //   private subtotal$ = new BehaviorSubject<number>(0);
// //   subtotal = this.subtotal$.asObservable();

// //   // BehaviorSubject לעלות המשלוח
// //   private shippingCost$ = new BehaviorSubject<number>(0);
// //   shippingCost = this.shippingCost$.asObservable();

// //   // Observable שמחשב את סך הכל (מוצרים + משלוח) בזמן אמת
// //   total$ = combineLatest([this.subtotal$, this.shippingCost$]).pipe(
// //     map(([subtotal, shipping]) => subtotal + shipping)
// //   );
// // constructor(private fb: FormBuilder, private cartStorage: CartStorage, private http: HttpClient) {
// //     // 1. הגדרת מבנה הטופס
// //     this.checkoutForm = this.fb.group({
// //       personalDetails: this.fb.group({
// //         firstName: ['', Validators.required],
// //         lastName: ['', Validators.required],
// //         phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
// //         email: ['', [Validators.required, Validators.email]],
// //         notes: ['']
// //       }),
     
// //       shipping: this.fb.group({
// //         method: ['courier', Validators.required], // ברירת מחדל: שליח עד הבית
// //         branch: [''] // לא חובה כשזה שליח
// //       }),
// //       payment: this.fb.group({
// //         method: ['credit-card', Validators.required],
// //         cardHolder: ['', Validators.required],
// //         cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
// //         expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]],
// //         cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
// //       })
// //     });
// //        this.recalcFromCart();

// //     // 2. הפעלת הלוגיקה הראשונית (כדי שהמחיר ופס ההתקדמות יחושבו מיד)
// //     const initialMethod = this.checkoutForm.get('shipping.method')?.value;
// //     this.updateShippingLogic(initialMethod);

// //     // 3. האזנה לשינויים עתידיים בשיטת המשלוח
// //     this.checkoutForm.get('shipping.method')?.valueChanges.subscribe(method => {
// //       this.updateShippingLogic(method);
// //     });
// //   }
// //   // פונקציה לעדכון עלות המשלוח והולידציות של הסניפים
// //   private updateShippingLogic(method: string) {
// //     const currentSubtotal = this.subtotal$.value;
// //     const branchControl = this.checkoutForm.get('shipping.branch');
// //     let cost = 0;

// //     if (method === 'courier') {
// //       // לוגיקה: שליח עד הבית 30 ש"ח, חינם מעל 250 ש"ח
// //       cost = currentSubtotal >= 250 ? 0 : 30;
// //       branchControl?.clearValidators();
// //     } 
// //     // else if (method === 'point') {
// //     //   // נקודת איסוף - 14 ש"ח
// //     //   cost = 14;
// //     //   branchControl?.clearValidators();
// //     // } 
// //     else if (method === 'pickup') {
// //       // איסוף מסניף - תמיד חינם
// //       cost = 0;
// //       branchControl?.setValidators([Validators.required]);
// //     }

// //     branchControl?.updateValueAndValidity();
// //     this.shippingCost$.next(cost);
// //   }

// //   // פונקציה לעדכון סכום הביניים (לשימוש אם מוסיפים מוצרים בעגלה)
// //   updateSubtotal(amount: number) {
// //     this.subtotal$.next(amount);
// //     // הרצת הלוגיקה מחדש כדי לבדוק אם כעת מגיע לה משלוח חינם
// //     const currentMethod = this.checkoutForm.get('shipping.method')?.value;
// //     this.updateShippingLogic(currentMethod);
// //   }
// // recalcFromCart() {
// //   const cart = this.cartStorage.getCart();

// //   const sum = cart.reduce((acc: number, item: any) => {
// //     const price = Number(item.productPrice ?? 0);
// //     const qty = Number(item.quantity ?? 0);
// //     return acc + price * qty;
// //   }, 0);

// //   this.updateSubtotal(sum);
// // }
// // private getUserIdFromStorage(): number | null {
// //   const raw = localStorage.getItem('UserId');
// //   if (!raw) return null;

// //   // אם נשמר מספר כמו "3"
// //   const asNum = Number(raw);
// //   if (Number.isFinite(asNum) && asNum > 0) return asNum;

// //   // אם נשמר אובייקט JSON
// //   try {
// //     const obj = JSON.parse(raw);
// //     const id = Number(obj?.userId ?? obj?.UserId ?? obj?.id);
// //     return Number.isFinite(id) && id > 0 ? id : null;
// //   } catch {
// //     return null;
// //   }
// // }

// // private toHebrewShipping(method: string): string {
// //   return method === 'pickup' ? 'איסוף מהסניף הקרוב' : 'משלוח עד הבית';
// // }
// //   // submitOrder() {
// //   //   if (this.checkoutForm.valid) {
// //   //     const finalData = this.checkoutForm.value;
// //   //     console.log('הזמנה בוצעה בהצלחה!', finalData);
// //   //     // כאן יבוא הניווט לדף הצלחה
// //   //   } else {
// //   //     this.checkoutForm.markAllAsTouched();
// //   //     alert('נא למלא את כל שדות החובה לפני אישור ההזמנה');
// //   //     this.findFirstInvalidStep();
// //   //   }
// //   // }
// // submitOrder() {
// //   console.log('FORM VALID?', this.checkoutForm.valid);
// // console.log('personalDetails valid?', this.checkoutForm.get('personalDetails')?.valid, this.checkoutForm.get('personalDetails')?.errors);
// // console.log('shipping valid?', this.checkoutForm.get('shipping')?.valid, this.checkoutForm.get('shipping')?.errors);
// // console.log('payment valid?', this.checkoutForm.get('payment')?.valid, this.checkoutForm.get('payment')?.errors);

// // console.log('cardNumber errors', this.checkoutForm.get('payment.cardNumber')?.errors);
// // console.log('expiry errors', this.checkoutForm.get('payment.expiry')?.errors);
// // console.log('cvv errors', this.checkoutForm.get('payment.cvv')?.errors);
// // console.log('phone errors', this.checkoutForm.get('personalDetails.phone')?.errors);
// //   if (!this.checkoutForm.valid) {
// //     this.checkoutForm.markAllAsTouched();
// //     alert('נא למלא את כל שדות החובה לפני אישור ההזמנה');
// //     return;
// //   }

// //   // 1) להביא userId (תומך גם במספר וגם באובייקט)
// //   const userId = this.getUserIdFromStorage();
// //   if (!userId) {
// //     alert('כדי לבצע הזמנה חייבים להתחבר');
// //     return;
// //   }

// //   // 2) להביא פריטים מהעגלה
// //   const cart = this.cartStorage.getCart();
// //   if (!cart || cart.length === 0) {
// //     alert('העגלה ריקה');
// //     return;
// //   }

// //   // 3) שיטת משלוח בעברית
// //   const method = this.checkoutForm.get('shipping.method')?.value;
// //   if (method !== 'courier' && method !== 'pickup') {
// //     alert('שיטת משלוח לא תקינה');
// //     return;
// //   }

// //   const shippingMethodHeb = this.toHebrewShipping(method);

// //   // 4) בניית payload לשרת
// //   const payload = {
// //     userId,
// //     shippingMethod: shippingMethodHeb,
// //     items: cart.map((it: any) => ({
// //       productId: Number(it.productId),
// //       quantity: Number(it.quantity),
// //       size: it.size === null || it.size === undefined ? 0 : Number(it.size)
// //     }))
// //   };

// //   // 5) POST לשרת
// //   const url = `${environment.apiUrl}/orders`;

// //   this.http.post(url, payload).subscribe({
// //     next: (createdOrder: any) => {
// //       // 6) לרוקן עגלה + לחשב מחדש subtotal
// //       this.cartStorage.saveCart([]);
// //       this.recalcFromCart();

// //       alert('ההזמנה בוצעה בהצלחה!');
// //       console.log('Order created:', createdOrder);
// //     },
// //     error: (err) => {
// //       console.error('Order failed:', err);
// //       const msg = err?.error ?? 'שגיאה בביצוע ההזמנה';
// //       alert(typeof msg === 'string' ? msg : 'שגיאה בביצוע ההזמנה');
// //     }
// //   });
// // }
// //   private findFirstInvalidStep() {
// //     if (this.checkoutForm.get('personalDetails')?.invalid) return 1;
// //     if (this.checkoutForm.get('shipping')?.invalid) return 2;
// //     if (this.checkoutForm.get('payment')?.invalid) return 3;
// //     return 1;
// //   }
// // }
// import { Injectable } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BehaviorSubject, combineLatest, map } from 'rxjs';
// import { CartStorage } from './cart-storage.service';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';

// @Injectable({ providedIn: 'root' })
// export class CheckoutService {
//   public checkoutForm: FormGroup;

//   public branches: string[] = [
//     'אשדוד - סימול',
//     'תל אביב - עזריאלי',
//     'ירושלים - קניון מלחה',
//     'ראשון לציון - קניון הזהב',
//   ];

//   private subtotal$ = new BehaviorSubject<number>(0);
//   subtotal = this.subtotal$.asObservable();

//   private shippingCost$ = new BehaviorSubject<number>(0);
//   shippingCost = this.shippingCost$.asObservable();

//   total$ = combineLatest([this.subtotal$, this.shippingCost$]).pipe(
//     map(([subtotal, shipping]) => subtotal + shipping)
//   );
//  private orderSuccess$ = new BehaviorSubject<boolean>(false);
//   orderSuccess = this.orderSuccess$.asObservable();
//   constructor(
//     private fb: FormBuilder,
//     private cartStorage: CartStorage,
//     private http: HttpClient
//   ) {
//     this.checkoutForm = this.fb.group({
//       personalDetails: this.fb.group({
//         firstName: ['', Validators.required],
//         lastName: ['', Validators.required],
//         phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//         email: ['', [Validators.required, Validators.email]],
//         notes: [''],
//       }),

//       shipping: this.fb.group({
//         method: ['courier', Validators.required], // courier / pickup
//         branch: [''],
//       }),

//       payment: this.fb.group({
//         method: ['credit-card', Validators.required],
//         cardHolder: ['', Validators.required],
//         cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
//         expiry: [
//           '',
//           [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')],
//         ],
//         cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
//       }),
//     });

//     // ✅ חישוב ראשוני מהעגלה
//     this.recalcFromCart();

//     // ✅ כל שינוי בעגלה -> subtotal מתעדכן אוטומטית (זה פותר לך את ה-0)
//     this.cartStorage.cartChanges$.subscribe(() => this.recalcFromCart());

//     // ✅ משלוח ראשוני
//     const initialMethod = this.checkoutForm.get('shipping.method')?.value;
//     this.updateShippingLogic(initialMethod);

//     // ✅ שינוי שיטת משלוח
//     this.checkoutForm.get('shipping.method')?.valueChanges.subscribe((method) => {
//       this.updateShippingLogic(method);
//     });
//   }

//   private updateShippingLogic(method: string) {
//     const currentSubtotal = this.subtotal$.value;
//     const branchControl = this.checkoutForm.get('shipping.branch');
//     let cost = 0;

//     if (method === 'courier') {
//       cost = currentSubtotal >= 250 ? 0 : 30;
//       branchControl?.clearValidators();
//     } else if (method === 'pickup') {
//       cost = 0;
//       branchControl?.setValidators([Validators.required]);
//     }

//     branchControl?.updateValueAndValidity();
//     this.shippingCost$.next(cost);
//   }

//   updateSubtotal(amount: number) {
//     this.subtotal$.next(amount);

//     // ✅ כל שינוי בסכום -> לחשב מחדש משלוח (חינם מעל 250)
//     const currentMethod = this.checkoutForm.get('shipping.method')?.value;
//     this.updateShippingLogic(currentMethod);
//   }

//   recalcFromCart() {
//     this.cartStorage.ensureCartInitialized();

//     const cart = this.cartStorage.getCart();

//     // ✅ חישוב חסין (גם אם משהו משתנה בשם שדה בעתיד)
//     const sum = (cart ?? []).reduce((acc: number, item: any) => {
//       const priceRaw = item.productPrice ?? item.price ?? 0;
//       const qtyRaw = item.quantity ?? item.qty ?? 0;

//       const price = Number(priceRaw);
//       const qty = Number(qtyRaw);

//       return acc + (Number.isFinite(price) ? price : 0) * (Number.isFinite(qty) ? qty : 0);
//     }, 0);

//     this.updateSubtotal(sum);
//   }

//   private getUserIdFromStorage(): number | null {
//     const raw = localStorage.getItem('UserId');
//     if (!raw) return null;

//     const asNum = Number(raw);
//     if (Number.isFinite(asNum) && asNum > 0) return asNum;

//     try {
//       const obj = JSON.parse(raw);
//       const id = Number(obj?.userId ?? obj?.UserId ?? obj?.id);
//       return Number.isFinite(id) && id > 0 ? id : null;
//     } catch {
//       return null;
//     }
//   }

//   private toHebrewShipping(method: string): string {
//     return method === 'pickup' ? 'איסוף מהסניף הקרוב' : 'משלוח עד הבית';
//   }

//   // ✅ מנרמל קלטים (כרטיס/טלפון) כדי שלא יפלו על pattern בגלל רווחים/מקפים
//   private normalizeBeforeValidate() {
//     const phoneCtrl = this.checkoutForm.get('personalDetails.phone');
//     if (phoneCtrl?.value) {
//       phoneCtrl.setValue(String(phoneCtrl.value).replace(/\D+/g, ''), { emitEvent: false });
//     }

//     const payment = this.checkoutForm.get('payment') as FormGroup;
//     const cardNumberCtrl = payment.get('cardNumber');
//     const expiryCtrl = payment.get('expiry');
//     const cvvCtrl = payment.get('cvv');

//     if (cardNumberCtrl?.value) {
//       cardNumberCtrl.setValue(String(cardNumberCtrl.value).replace(/\D+/g, ''), {
//         emitEvent: false,
//       });
//     }
//     if (expiryCtrl?.value) {
//       expiryCtrl.setValue(String(expiryCtrl.value).replace(/\s+/g, ''), { emitEvent: false });
//     }
//     if (cvvCtrl?.value) {
//       cvvCtrl.setValue(String(cvvCtrl.value).replace(/\D+/g, ''), { emitEvent: false });
//     }
//   }
// private normalizeExpiry(): void {
//   const ctrl = this.checkoutForm.get('payment.expiry');
//   if (!ctrl) return;

//   const v = String(ctrl.value ?? '').trim();

//   if (/^\d{4}$/.test(v)) {
//     ctrl.setValue(v.slice(0, 2) + '/' + v.slice(2), { emitEvent: false });
//   }
// }
//   closeSuccessPopup() {
//     this.orderSuccess$.next(false);
//   }
//   submitOrder() {
//     this.normalizeExpiry();
//     this.checkoutForm.updateValueAndValidity();

//     this.normalizeBeforeValidate();

//     if (!this.checkoutForm.valid) {
//       this.checkoutForm.markAllAsTouched();
//       alert('נא למלא את כל שדות החובה לפני אישור ההזמנה');
//       return;
//     }

//     const userId = this.getUserIdFromStorage();
//     if (!userId) {
//       alert('כדי לבצע הזמנה חייבים להתחבר');
//       return;
//     }

//     const cart = this.cartStorage.getCart();
//     if (!cart || cart.length === 0) {
//       alert('העגלה ריקה');
//       return;
//     }

//     const method = this.checkoutForm.get('shipping.method')?.value;
//     if (method !== 'courier' && method !== 'pickup') {
//       alert('שיטת משלוח לא תקינה');
//       return;
//     }

//     const payload = {
//       userId,
//       shippingMethod: this.toHebrewShipping(method),
//       items: cart.map((it: any) => ({
//         productId: Number(it.productId),
//         quantity: Number(it.quantity ?? it.qty ?? 0),
//         size: it.size === null || it.size === undefined ? 0 : Number(it.size),
//       })),
//     };

//     const url = `${environment.apiUrl}/orders`;

//     this.http.post(url, payload).subscribe({
//       next: (createdOrder: any) => {
//         // ✅ ניקוי מקצועי: דרך service כדי שזה גם יעדכן את כל המסכים
//         this.cartStorage.clearCart();
       
//         console.log('Order created:', createdOrder);
//       },
//       error: (err) => {
//         console.error('Order failed:', err);
//         const msg = err?.error ?? 'שגיאה בביצוע ההזמנה';
//         alert(typeof msg === 'string' ? msg : 'שגיאה בביצוע ההזמנה');
//       },
//     });
//   }
// }
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { CartStorage } from './cart-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  public checkoutForm: FormGroup;

  public branches: string[] = [
    'אשדוד - סימול',
    'תל אביב - עזריאלי',
    'ירושלים - קניון מלחה',
    'ראשון לציון - קניון הזהב'
  ];

  private subtotal$ = new BehaviorSubject<number>(0);
  subtotal = this.subtotal$.asObservable();

  private shippingCost$ = new BehaviorSubject<number>(0);
  shippingCost = this.shippingCost$.asObservable();

  total$ = combineLatest([this.subtotal$, this.shippingCost$]).pipe(
    map(([subtotal, shipping]) => subtotal + shipping)
  );

  // ✅ זה הדגל להצלחה (הקומפוננטה תאזין לו)
  private orderSuccess$ = new BehaviorSubject<boolean>(false);
  orderSuccess = this.orderSuccess$.asObservable();

  constructor(
    private fb: FormBuilder,
    private cartStorage: CartStorage,
    private http: HttpClient
  ) {
    this.checkoutForm = this.fb.group({
      personalDetails: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        notes: ['']
      }),

      shipping: this.fb.group({
        method: ['courier', Validators.required],
        branch: ['']
      }),

      payment: this.fb.group({
        method: ['credit-card', Validators.required],
        cardHolder: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{2})$')]],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
      })
    });

    this.recalcFromCart();

    const initialMethod = this.checkoutForm.get('shipping.method')?.value;
    this.updateShippingLogic(initialMethod);

    this.checkoutForm.get('shipping.method')?.valueChanges.subscribe(method => {
      this.updateShippingLogic(method);
    });
  }

  private updateShippingLogic(method: string) {
    const currentSubtotal = this.subtotal$.value;
    const branchControl = this.checkoutForm.get('shipping.branch');
    let cost = 0;

    if (method === 'courier') {
      cost = currentSubtotal >= 250 ? 0 : 30;
      branchControl?.clearValidators();
    } else if (method === 'pickup') {
      cost = 0;
      branchControl?.setValidators([Validators.required]);
    }

    branchControl?.updateValueAndValidity();
    this.shippingCost$.next(cost);
  }

  updateSubtotal(amount: number) {
    this.subtotal$.next(amount);
    const currentMethod = this.checkoutForm.get('shipping.method')?.value;
    this.updateShippingLogic(currentMethod);
  }

  recalcFromCart() {
    const cart = this.cartStorage.getCart();
    const sum = cart.reduce((acc: number, item: any) => {
      const price = Number(item.productPrice ?? 0);
      const qty = Number(item.quantity ?? 0);
      return acc + price * qty;
    }, 0);

    this.updateSubtotal(sum);
  }
private getUserIdFromStorage(): number | null {

  const raw = sessionStorage.getItem('user');

  if (!raw) return null;

  try {
    const user = JSON.parse(raw);
    const id = Number(user?.id);

    return Number.isFinite(id) && id > 0 ? id : null;

  } catch {
    return null;
  }
}
  // private getUserIdFromStorage(): number | null {
  //   // const raw = localStorage.getItem('UserId');
  //   const raw = sessionStorage.getItem('id');
  //   if (!raw) return null;

  //   const asNum = Number(raw);
  //   if (Number.isFinite(asNum) && asNum > 0) return asNum;

  //   try {
  //     const obj = JSON.parse(raw);
  //     const id = Number(obj?.userId ?? obj?.UserId ?? obj?.id);
  //     return Number.isFinite(id) && id > 0 ? id : null;
  //   } catch {
  //     return null;
  //   }
  // }

  private toHebrewShipping(method: string): string {
    return method === 'pickup' ? 'איסוף מהסניף הקרוב' : 'משלוח עד הבית';
  }

  // ✅ כדי שהקומפוננטה תוכל לסגור את ההודעה
  closeSuccessPopup() {
    this.orderSuccess$.next(false);
  }

  submitOrder() {
    // טיפ: אם יש לך normalizeExpiry - תקראי לו פה
    this.checkoutForm.updateValueAndValidity();

    if (!this.checkoutForm.valid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const userId = this.getUserIdFromStorage();
    if (!userId) return;

    const cart = this.cartStorage.getCart();
    if (!cart || cart.length === 0) return;

    const method = this.checkoutForm.get('shipping.method')?.value;
    if (method !== 'courier' && method !== 'pickup') return;

    const payload = {
      userId,
      shippingMethod: this.toHebrewShipping(method),
      items: cart.map((it: any) => ({
        productId: Number(it.productId),
        quantity: Number(it.quantity),
        size: it.size === null || it.size === undefined ? 0 : Number(it.size)
      }))
    };

    const url = `${environment.apiUrl}/orders`;

    this.http.post(url, payload).subscribe({
      next: () => {
        // ✅ לרוקן עגלה
        this.cartStorage.saveCart([]);
        this.recalcFromCart();

        // ✅ להראות הצלחה (UI)
        this.orderSuccess$.next(true);
      },
      error: () => {
        // אם תרצי גם מודאל כשלון יפה אפשר באותו עיקרון
      }
    });
  }
}