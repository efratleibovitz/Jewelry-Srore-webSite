import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../../models/address.model';
import { UserService } from '../../../services/address.service';  // וודא שהנתיב נכון בהתאם למבנה הפרויקט שלך 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-address-card',
  imports: [CommonModule],
  templateUrl: './address-card.html',
  styleUrl: './address-card.css',
})
export class AddressCard {
  @Input() address!: Address;
  @Output() onEdit = new EventEmitter<Address>();
  @Output() onDelete = new EventEmitter<string>();
}
