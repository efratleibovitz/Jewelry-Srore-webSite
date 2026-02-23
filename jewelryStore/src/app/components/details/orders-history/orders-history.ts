import { Component } from '@angular/core';
import { AddressCard } from '../address-card/address-card';
import { CommonModule } from '@angular/common';
import { OrderStepper } from '../order-stepper/order-stepper';
import { OrderItemsList } from '../order-items-list/order-items-list';
import { RouterModule } from '@angular/router';
import { Order, OrderStatus } from '../../../models/order.model';
import { OrderService } from '../../../services/order.servise';

@Component({
  selector: 'app-orders-history',
  imports: [CommonModule, OrderStepper, OrderItemsList, RouterModule],
  templateUrl: './orders-history.html',
  styleUrl: './orders-history.css',
})
export class OrdersHistory {
  //
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    // משיכת ההזמנות מהסרוויס
    this.orders = this.orderService.getUserOrders();
    console.log("ההזמנות שהגיעו מהסרוויס:", this.orders);
  }
}
