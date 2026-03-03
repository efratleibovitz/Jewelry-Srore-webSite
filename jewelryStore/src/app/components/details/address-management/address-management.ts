import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';       
import { Address } from '../../../models/address.model';
// import { UserService } from '../../../services/address.service';
import { AddressCard } from '../address-card/address-card';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-address-management',
  imports: [AddressCard, CommonModule,FormsModule],
  templateUrl: './address-management.html',
  styleUrl: './address-management.css',
})
export class AddressManagement implements OnInit {
  addresses: Address[] = [];
  // showForm: boolean = false;
  selectedAddress: Address | null = null; // לטובת עריכה
  currentAddress: Address = this.getEmptyAddress();
  
  
  userData: any = null; // אובייקט יחיד במקום מערך
  showForm: boolean = false;
  
  
  constructor(private userService: UserService) {}

 ngOnInit() {
    // טעינת המשתמש הנוכחי מה-Service
    const user = this.userService.getCurrentUser();
    if (user) {
      this.userData = { ...user };
    }
  }

  getEmptyAddress(): Address {
    return { id: '', fullName: '', city: '', street: '', houseNumber: '', phone: '', isDefault: false };
  }

  openNewAddressForm() {
    this.currentAddress = this.getEmptyAddress(); // מאפסים את הטופס
    this.showForm = true;
  }
  // handleEdit(addr: Address) {
  //   // יוצרים עותק כדי שלא ישנה את הכרטיס בזמן ההקלדה אלא רק בשמירה
  //   // this.currentAddress = { ...addr }; 
  //   this.showForm = true;
  // }
  handleEdit() {
    // יוצרים עותק כדי שלא ישנה את הכרטיס בזמן ההקלדה אלא רק בשמירה
    // this.currentAddress = { ...addr }; 
    this.showForm = true;
  }

  // saveAddress() {
  //     if (this.currentAddress.fullName && this.currentAddress.phone) { // בדיקה בסיסית שמילאו פרטים
  //         if (this.currentAddress.id) {
  //             this.userService.updateAddress(this.currentAddress);
  //         } else {
  //             // יצירת ID זמני אם השירות לא יוצר אחד
  //             this.currentAddress.id = Math.random().toString(36).substr(2, 9);
  //             this.userService.addAddress(this.currentAddress);
  //         }
          
  //         // חשוב: לעדכן את המערך המקומי מהשירות
  //         this.addresses = [...this.userService.getAddresses()]; 
  //         this.showForm = false;
  //     } else {
  //         alert("נא למלא שם וטלפון");
  //     }
  // }

  // saveAddress() {
  //   // קריאה ל-Service החדש שיצרנו מקודם
  //   this.userService.updateUserFields(this.userData.UserId, this.userData).subscribe({
  //     next: (updatedUser) => {
  //       this.userData = { ...updatedUser };
  //       this.showForm = false;
  //       alert("הפרטים עודכנו בהצלחה!");
  //     },
  //     error: () => alert("שגיאה בעדכון הפרטים")
  //   });
  // }

saveAddress() {
  // יצירת אובייקט שתואם בדיוק ל-UserUpdateDto ב-C#
  const updateDto = {
    userId: Number(this.userData.id), // המרה למספר ושימוש בשם השדה מה-API
    firstName: this.userData.firstName,
    lastName: this.userData.lastName,
    phone: Number(this.userData.phone),        // המרה למספר לפי בקשתך
    city: this.userData.city,
    street: this.userData.street,
    houseNumber: Number(this.userData.houseNumber), // המרה למספר
    userEmail: this.userData.userEmail // השדה הזה חובה ב-UserUpdateDto שלך
  };

  console.log("Sending to server:", updateDto); // לבדיקה ב-Console

  this.userService.updateUserFields(updateDto.userId, updateDto).subscribe({
    next: (updatedUser) => {
      // עדכון הנתונים המקומיים עם מה שחזר מהשרת
      this.userData = { ...updatedUser };
      this.showForm = false;
      alert("הפרטים עודכנו בהצלחה!");
    },
    error: (err) => {
      console.error("Server error:", err);
      alert("שגיאה בעדכון: וודא שכל השדות מלאים ושדות המספרים תקינים");
    }
  });
}

  // handleDelete(id: string) {
  //   if(confirm('בטוח שברצונך למחוק?')) {
  //   this.userService.deleteAddress(id);
  //   this.addresses = this.userService.getAddresses(); // רענון רשימה
  //   }
  // }
}

