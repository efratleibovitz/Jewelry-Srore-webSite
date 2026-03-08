
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
  // const raw = sessionStorage.getItem('user');

  // if (!raw) return null;
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