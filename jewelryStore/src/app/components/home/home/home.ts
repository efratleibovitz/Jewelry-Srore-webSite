import { Component } from '@angular/core';
import { CategoryItemArr } from '../category-item-arr/category-item-arr';

@Component({
  selector: 'app-home',
  imports: [CategoryItemArr],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
