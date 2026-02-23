import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryItem } from '../category-item/category-item';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-item-arr',
  imports: [CommonModule, CategoryItem,RouterModule],
  templateUrl: './category-item-arr.html',
  styleUrl: './category-item-arr.css',
})
export class CategoryItemArr {
   categories = [
    { title: 'Studio Collections', image: 'pictures/studio.jpg' },
    { title: 'Pearls', image: 'pictures/pearls.jpg' },
    { title: 'Trends', image: 'pictures/trends.jpg' },
    { title: 'Classic', image: 'pictures/classic.jpg' },
    { title: 'Online only', image: 'pictures/onlineOnly.jpg' },
  ];
}
