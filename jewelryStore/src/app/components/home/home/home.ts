import { Component } from '@angular/core';
import { CategoryItemArr } from '../category-item-arr/category-item-arr';
import { Router, RouterLink } from '@angular/router'; // בשביל ניתוב לתפריט המוצר
@Component({
  selector: 'app-home',
  imports: [CategoryItemArr],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}

  goToColor(color: 'silver' | 'gold' | 'colorful', ev: PointerEvent) {
     ev.preventDefault();
    ev.stopPropagation();
      

    this.router.navigate(['/shop'], { queryParams: { color } });
  }
}
