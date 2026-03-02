import { Component,Output,EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    @Output() openCart = new EventEmitter<void>();

  opencart() {
    this.openCart.emit();
  }
    @Output() openUser = new EventEmitter<void>();

  openuser() {
    this.openUser.emit();
  }
}