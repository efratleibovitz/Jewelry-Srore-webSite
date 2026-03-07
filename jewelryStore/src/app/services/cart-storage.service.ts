// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartStorage {
//    private readonly KEY = 'cart';
//      ensureCartInitialized(): void {
//     const raw = localStorage.getItem(this.KEY);
//     if (!raw) {
//       localStorage.setItem(this.KEY, JSON.stringify([]));
//     }
//   }
// // addToCart(product: any): void {
// //   const raw = localStorage.getItem(this.KEY);
// //   const cart = raw ? JSON.parse(raw) : [];

// //   // מחפשים אם כבר קיים מוצר עם אותו id
// //   const existingProduct = cart.find((item: any) => item.id === product.id);

// //   if (existingProduct) {
// //     existingProduct.quantity += 1;
// //   } else {
// //     cart.push({ ...product, quantity: 1 });
// //   }

// //   localStorage.setItem(this.KEY, JSON.stringify(cart));
// // }
// // addToCart(product: any, qty: number = 1): void {
// //   const raw = localStorage.getItem(this.KEY);
// //   const cart = raw ? JSON.parse(raw) : [];

// //   const productId = Number(product.id ?? product.productId);
// //   if (!productId) {
// //     console.error('addToCart: product has no valid id', product);
// //     return;
// //   }

// //   const safeQty = Number(qty);
// //   if (!Number.isFinite(safeQty) || safeQty <= 0) {
// //     console.error('addToCart: invalid qty', qty);
// //     return;
// //   }

// //   const existing = cart.find((item: any) => item.productId === productId);

// //   if (existing) {
// //     existing.quantity += safeQty;
// //   } else {
// //     cart.push({
// //       productId,
// //       productName: product.name ?? product.productName,
// //       productPrice: Number(product.price ?? product.productPrice),
// //       image1: product.image1 ?? product.imageUrl,
// //       quantity: safeQty
// //     });
// //   }

// //   localStorage.setItem(this.KEY, JSON.stringify(cart));
// // }
// addToCart(product: any, qty: number = 1, size: number | null = null): void {
//   const raw = localStorage.getItem(this.KEY);
//   const cart = raw ? JSON.parse(raw) : [];

//   const productId = Number(product.id ?? product.productId);
//   if (!productId) {
//     console.error('addToCart: product has no valid id', product);
//     return;
//   }

//   const safeQty = Number(qty);
//   if (!Number.isFinite(safeQty) || safeQty <= 0) {
//     console.error('addToCart: invalid qty', qty);
//     return;
//   }

//   // ✅ אותו מוצר + אותה מידה = אותו פריט
//   const existing = cart.find((item: any) =>
//     item.productId === productId && (item.size ?? null) === (size ?? null)
//   );

//   if (existing) {
//     existing.quantity += safeQty;
//   } else {
//     cart.push({
//       productId,
//       size, // ✅ נשמר
//       productName: product.name ?? product.productName,
//       productPrice: Number(product.price ?? product.productPrice),
//       image1: product.image1 ?? product.imageUrl,
//       quantity: safeQty
//     });
//   }

//   localStorage.setItem(this.KEY, JSON.stringify(cart));
// }
// getCart(): any[] {
//   const raw = localStorage.getItem(this.KEY);
//   return raw ? JSON.parse(raw) : [];
// }
// saveCart(cart: any[]): void {
//   localStorage.setItem(this.KEY, JSON.stringify(cart));
// }
// // removeFromCart(id: number): void {
// //   const raw = localStorage.getItem(this.KEY);
// //   const cart = raw ? JSON.parse(raw) : [];

// //   const updatedCart = cart.filter((item: any) => item.id !== id);

// //   localStorage.setItem(this.KEY, JSON.stringify(updatedCart));
// // }
// // removeFromCart(productId: number): void {
// //   const raw = localStorage.getItem(this.KEY);
// //   const cart = raw ? JSON.parse(raw) : [];
// //   const updatedCart = cart.filter((item: any) => item.productId !== productId);
// //   localStorage.setItem(this.KEY, JSON.stringify(updatedCart));
// // }
// removeFromCart(productId: number, size: number | null = null): void {
//   const raw = localStorage.getItem(this.KEY);
//   const cart = raw ? JSON.parse(raw) : [];

//   const pid = Number(productId);
//   const s = size === null || size === undefined ? null : Number(size);

//   const updated = cart.filter((x: any) => {
//     const xPid = Number(x.productId);
//     const xSize = x.size === null || x.size === undefined ? null : Number(x.size);
//     return !(xPid === pid && xSize === s);
//   });

//   localStorage.setItem(this.KEY, JSON.stringify(updated));
// }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartStorage {
  private readonly KEY = 'cart';

  // ✅ משדר לכל מי שמאזין כשהעגלה משתנה (הכי חשוב בשביל Checkout)
  private cartSubject = new BehaviorSubject<any[]>([]);
  public cartChanges$ = this.cartSubject.asObservable();

  constructor() {
    this.ensureCartInitialized();
    this.cartSubject.next(this.getCart());
  }

  ensureCartInitialized(): void {
    const raw = localStorage.getItem(this.KEY);
    if (!raw) {
      localStorage.setItem(this.KEY, JSON.stringify([]));
    }
  }

  // addToCart(product: any, qty: number = 1, size: number | null = null): void {
  //   this.ensureCartInitialized();

  //   const cart = this.getCart();

  //   const productId = Number(product.id ?? product.productId);
  //   if (!productId) {
  //     console.error('addToCart: product has no valid id', product);
  //     return;
  //   }

  //   const safeQty = Number(qty);
  //   if (!Number.isFinite(safeQty) || safeQty <= 0) {
  //     console.error('addToCart: invalid qty', qty);
  //     return;
  //   }

  //   // ✅ אותו מוצר + אותה מידה = אותו פריט
  //   const existing = cart.find((item: any) =>
  //     Number(item.productId) === productId &&
  //     (item.size ?? null) === (size ?? null)
  //   );

  //   if (existing) {
  //     existing.quantity = Number(existing.quantity ?? 0) + safeQty;
  //   } else {
  //     cart.push({
  //       productId,
  //       size, // ✅ נשמר
  //       productName: product.name ?? product.productName,
  //       productPrice: Number(product.price ?? product.productPrice),
  //       image1: product.image1 ?? product.imageUrl,
  //       quantity: safeQty,
  //     });
  //   }

  //   this.saveCart(cart);
  // }
  addToCart(product: any, qty: number = 1, size: number | null = null): void {
this.ensureCartInitialized();

const cart = this.getCart();

const productId = Number(product.id ?? product.productId);
if (!productId) {
console.error('addToCart: product has no valid id', product);
return;
}

const safeQty = Number(qty);
if (!Number.isFinite(safeQty) || safeQty <= 0) {
console.error('addToCart: invalid qty', qty);
return;
}

// --- תחילת שינוי: מציאת המלאי המקסימלי למידה שנבחרה ---
// const sizeObj = product.sizes?.find((s: any) => s.size === size);
// const stockLimit = sizeObj ? (sizeObj.amount ?? sizeObj.quantity) : 99;
const sizeObj = product.sizes?.find((s: any) =>
  Number(s.size ?? s.productSize ?? s.ProductSize) === Number(size)
);

const stockLimit = sizeObj
  ? Number(sizeObj.amount ?? sizeObj.Amount ?? sizeObj.quantity ?? 0)
  : 0;
// --- סוף שינוי ---

const existing = cart.find((item: any) =>
Number(item.productId) === productId &&
(item.size ?? null) === (size ?? null)
);

if (existing) {
// כאן אנחנו מוודאים שהוספת הכמות לא עוברת את המלאי
const newTotal = Number(existing.quantity ?? 0) + safeQty;
existing.quantity = newTotal > stockLimit ? stockLimit : newTotal;
} else {
cart.push({
productId,
size,
productName: product.name ?? product.productName,
productPrice: Number(product.price ?? product.productPrice),
image1: product.image1 ?? product.imageUrl,
quantity: safeQty,
maxAmount: stockLimit // <--- שומרים את המלאי בתוך העגלה
});
}

this.saveCart(cart);
}



  getCart(): any[] {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  }

  saveCart(cart: any[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(cart));
    this.cartSubject.next(cart); // ✅ משדר שינוי
  }

  clearCart(): void {
    this.saveCart([]);
  }

  removeFromCart(productId: number, size: number | null = null): void {
    this.ensureCartInitialized();

    const cart = this.getCart();

    const pid = Number(productId);
    const s = size === null || size === undefined ? null : Number(size);

    const updated = cart.filter((x: any) => {
      const xPid = Number(x.productId);
      const xSize = x.size === null || x.size === undefined ? null : Number(x.size);
      return !(xPid === pid && xSize === s);
    });

    this.saveCart(updated);
  }
}