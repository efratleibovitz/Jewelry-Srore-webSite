import { Component } from '@angular/core';
import { CategoryItemArr } from '../category-item-arr/category-item-arr';
import { AdminProducts } from '../../admin-products/admin-products';

@Component({
  selector: 'app-home',
  imports: [CategoryItemArr,AdminProducts],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
