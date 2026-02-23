import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // ייבוא של שניהם

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule], // כאן שמים RouterModule, לא Router!
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
       userVisible = true;

  @Output() closeUser = new EventEmitter<void>();

  // ההזרקה הקריטית - בלי זה this.router לא יעבוד
  constructor(private router: Router) {} 

  onLogin() {
    console.log('מנווט לפרופיל...');
    this.router.navigate(['/profile']); 
    this.close();
  }

  close() {
    this.closeUser.emit();
  }
}