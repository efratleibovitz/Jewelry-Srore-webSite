import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service'; // הוספנו את ה-UserService

@Component({
  selector: 'app-account-settings',
  imports: [CommonModule, RouterModule],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.css',
})
export class AccountSettings {

  constructor(public userService: UserService) {}

}
