import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartStorage {
   private readonly KEY = 'cart';
     ensureCartInitialized(): void {
    const raw = localStorage.getItem(this.KEY);
    if (!raw) {
      localStorage.setItem(this.KEY, JSON.stringify([]));
    }
  }
addToCart(product: any): void {
  const raw = localStorage.getItem(this.KEY);
  const cart = raw ? JSON.parse(raw) : [];

  // מחפשים אם כבר קיים מוצר עם אותו id
  const existingProduct = cart.find((item: any) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(this.KEY, JSON.stringify(cart));
}

getCart(): any[] {
  const raw = localStorage.getItem(this.KEY);
  return raw ? JSON.parse(raw) : [];
}
saveCart(cart: any[]): void {
  localStorage.setItem(this.KEY, JSON.stringify(cart));
}
removeFromCart(id: number): void {
  const raw = localStorage.getItem(this.KEY);
  const cart = raw ? JSON.parse(raw) : [];

  const updatedCart = cart.filter((item: any) => item.id !== id);

  localStorage.setItem(this.KEY, JSON.stringify(updatedCart));
}

}
