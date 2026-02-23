import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userAddresses: Address[] = [
    { id: '1', fullName: 'ישראלה ישראלי', city: 'תל אביב', street: 'דיזינגוף', houseNumber: '100', phone: '050-1234567', isDefault: true }
  ];

  getAddresses() {
    return this.userAddresses;
  }

  addAddress(address: Address) {
    address.id = Math.random().toString(36).substr(2, 9);
    this.userAddresses.push(address);
  }

  updateAddress(updatedAddr: Address) {
    const index = this.userAddresses.findIndex(a => a.id === updatedAddr.id);
    if (index !== -1) this.userAddresses[index] = updatedAddr;
  }

  deleteAddress(id: string) {
    this.userAddresses = this.userAddresses.filter(a => a.id !== id);
  }
}