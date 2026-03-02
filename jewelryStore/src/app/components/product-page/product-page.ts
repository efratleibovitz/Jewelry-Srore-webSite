import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // בשביל @for וצינורות (pipes)
//import {  ProductDetails } from '../product-details/product-details';
import { RouterModule } from '@angular/router'; // בשביל routerLinkimport { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router'; // בשביל ניתוב לתפריט המוצר
import { ProductPageService } from '../../services/productPage.service'; 
@Component({
  selector: 'app-product-page',
  imports: [RouterModule, CommonModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})

export class ProductPageOld implements OnInit {
  allProducts: Product[] = [];
  constructor(private productService: ProductService,private router: Router,) {}

  ngOnInit() {
    // this.allProducts = this.productService.getProducts();
  }
}