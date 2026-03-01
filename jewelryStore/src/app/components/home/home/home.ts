import { Component } from '@angular/core';
import { CategoryItemArr } from '../category-item-arr/category-item-arr';
import { AdminProducts } from '../../admin-products/admin-products';
import { AdminOrders } from '../../admin-orders/admin-orders';
@Component({
  selector: 'app-home',
  imports: [CategoryItemArr,AdminProducts,AdminOrders],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
