import { Routes } from '@angular/router';
import { Home } from './components/home/home/home';
import { ProductPage } from './components/products/product-page/product-page';
import { ProductDetails } from './components/product-details/product-details';  
import { OrdersHistory } from './components/details/orders-history/orders-history';
import { AccountSettings } from './components/details/account-settings/account-settings'; // הוספנו את הקומפוננטה של הגדרות חשבון
import { AddressManagement } from './components/details/address-management/address-management'; // הוספנו את הקומפוננטה של ניהול כתובות
import { CheckOut } from './components/check-out/check-out/check-out';    
import { AdminOrders } from './components/admin-orders/admin-orders';
import { AdminProducts } from './components/admin-products/admin-products';
import { authGuard } from './services/auth.guard';
import { About } from './components/footer/about/about';
// import { AdminProducts } from './components/admin/admin-products/admin-products';
// import { AdminOrders } from './components/admin/admin-orders/admin-orders';
// import { authGuard } from './guards/auth.guard'; // נניח שיש לך guard בשם authGuard שבודק אם המשתמש מחובר לפני גישה לנתיב הפרופיל
export const routes: Routes = [
  { path: '', component: Home }, // דף הבית עם הקטגוריות
  { path: 'shop', component: ProductPage }, // קטלוג מוצרים כללי
 { path: 'product/:id', component: ProductDetails }, // דף מוצר ספציפי
  { path: 'checkout', component: CheckOut},
  { path: 'about', component: About },
  { 
    path: 'profile', 
    component: AccountSettings, // הקומפוננטה עם התפריט הצדדי וה-router-outlet
    
    canActivate: [authGuard], // מפעיל את ה-guard כדי לוודא שהמשתמש מחובר
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' }, // כשנכנסים ל-/profile זה מעביר אוטומטית להזמנות
      { path: 'orders', component: OrdersHistory },       // יוצג בתוך ה-outlet
      { path: 'addresses', component: AddressManagement }, // יוצג בתוך ה-outlet
      //{ path: 'details', component: UserDetails }       // אם תרצי בהמשך
    ]
  },
  { path: 'admin-products', component: AdminProducts },
  { path: 'admin-orders', component: AdminOrders },
    { path: '**', redirectTo: '' } ,
// ניתוב חזרה לדף הבית במקרה של שגיאה
];

// import { Routes } from '@angular/router';
// import { About } from './Components/Footer/about/about';
// import { Home } from './Components/HomePage/home/home';
// export const routes: Routes = [
//     { path: '', component: Home },
//      { path: 'about', component: About }
// ];