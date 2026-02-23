import { Component, Input } from '@angular/core';
import { OrderStatus } from '../../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-stepper',
  imports: [CommonModule],
  templateUrl: './order-stepper.html',
  styleUrl: './order-stepper.css',
})
export class OrderStepper {
  @Input() status: OrderStatus = OrderStatus.Received;
  
  // חשיפת ה-Enum ל-Template
  public OrderStatus = OrderStatus;

  isStepCompleted(step: number): boolean {
    return this.status >= step;
  }
}
