import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';       
import { Address } from '../../../models/address.model';
import { UserService } from '../../../services/address.service';
import { AddressCard } from '../address-card/address-card';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-address-management',
  imports: [AddressCard, CommonModule,FormsModule],
  templateUrl: './address-management.html',
  styleUrl: './address-management.css',
})
export class AddressManagement implements OnInit {
  addresses: Address[] = [];
  showForm: boolean = false;
  selectedAddress: Address | null = null; // לטובת עריכה
  currentAddress: Address = this.getEmptyAddress();
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.addresses = this.userService.getAddresses();
  }

  getEmptyAddress(): Address {
    return { id: '', fullName: '', city: '', street: '', houseNumber: '', phone: '', isDefault: false };
  }

  openNewAddressForm() {
    this.currentAddress = this.getEmptyAddress(); // מאפסים את הטופס
    this.showForm = true;
  }
  handleEdit(addr: Address) {
    // יוצרים עותק כדי שלא ישנה את הכרטיס בזמן ההקלדה אלא רק בשמירה
    this.currentAddress = { ...addr }; 
    this.showForm = true;
  }

  saveAddress() {
      if (this.currentAddress.fullName && this.currentAddress.phone) { // בדיקה בסיסית שמילאו פרטים
          if (this.currentAddress.id) {
              this.userService.updateAddress(this.currentAddress);
          } else {
              // יצירת ID זמני אם השירות לא יוצר אחד
              this.currentAddress.id = Math.random().toString(36).substr(2, 9);
              this.userService.addAddress(this.currentAddress);
          }
          
          // חשוב: לעדכן את המערך המקומי מהשירות
          this.addresses = [...this.userService.getAddresses()]; 
          this.showForm = false;
      } else {
          alert("נא למלא שם וטלפון");
      }
  }

  handleDelete(id: string) {
    if(confirm('בטוח שברצונך למחוק?')) {
    this.userService.deleteAddress(id);
    this.addresses = this.userService.getAddresses(); // רענון רשימה
    }
  }
}

