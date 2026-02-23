import { Component, Input } from '@angular/core';
import { OrderItem } from '../../../models/order.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-items-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-items-list.html',
  styleUrl: './order-items-list.css',
})
export class OrderItemsList {
  @Input() items: OrderItem[] = [];
}
