import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { CategoryItemArr } from './components/home/category-item-arr/category-item-arr';
// import { ProductPage } from './components/product-page/product-page';
// import { OrdersHistory } from './components/details/orders-history/orders-history';
// import { Home } from './components/home/home/home';
import {PageFooter} from './components/Footer/page-footer/page-footer';
import { CheckOut } from './components/check-out/check-out/check-out';
import { CartStorage } from './services/cart-storage.service';
import { Header } from './components/header/header';
import { Cart } from './components/cart/cart';
import { Login } from './components/login/login';
import { ProductPage } from './components/products/product-page/product-page';
import { DrawerModule } from 'primeng/drawer';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CheckOut,PageFooter,Header,Cart,Login,ProductPage,DrawerModule,DialogModule,ButtonModule,ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('JewelryStore');
  cartVisible = false;
  userVisible=false;
  cartItems: any[] = [];
    constructor(private cartStorage: CartStorage) {}

  ngOnInit(): void {
    this.cartStorage.ensureCartInitialized();
  }
openCart() {
  this.cartItems = this.cartStorage.getCart();
  this.cartVisible = true;
}

closeCart(){
  this.cartVisible = false;
}
openUser() {
  
  this.userVisible = true;
}

closeUser(){
  this.userVisible = false;
}
  


}