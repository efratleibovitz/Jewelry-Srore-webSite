import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // ייבוא של שניהם
import { UserService } from '../../services/user.service';      
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
constructor(private router: Router, private userService: UserService) {}
onLogin(email: string, pass: string) {
    // שליחת הנתונים ל-API דרך ה-Service
    this.userService.login({ email, password: pass }).subscribe({
      next: (user) => {
        if (user) {
          console.log('התחברת בהצלחה', user);
          
          // הודעת ברוך הבא יפה
          alert(`ברוך שובך, ${user.firstName}! איזה כיף לראות אותך שוב.`);

          // ניווט לדף הבית (Home) במקום לפרופיל, כפי שביקשת
          this.router.navigate(['/profile']); 
          
          this.close();
        } else {
          // בגלל שהשתמשנו ב-NoContent או Unauthorized ב-API, זה עלול להגיע לכאן
          alert("אימייל או סיסמה שגויים. נסה שוב.");
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert("חלה שגיאה בהתחברות. וודא שהפרטים נכונים.");
      }
    });
  }

  close() {
    this.closeUser.emit();
  }
postResponse(email: string, fName: string, lName: string, pass: string, city: string, street: string, hNum: string, phone: string) {
    const newUser = {
      email: email,
      firstName: fName,
      lastName: lName,
      password: pass,
      city: city,
      street: street,
      houseNumber: parseInt(hNum),
      phone: parseInt(phone),
      isAdmin: false
    };

    this.userService.register(newUser).subscribe({
      next: (res) => {
        console.log('נרשם בהצלחה!', res);
        
        // הודעת ברוך הבא למשתמש חדש
        alert(`ברוך הבא, ${fName}! הרישום בוצע בהצלחה.`);

        // ניווט לדף הבית
        this.router.navigate(['/home']); 
        this.close();
      },
      error: (err) => {
        console.error('שגיאה ברישום:', err);
        alert('הרישום נכשל. ייתכן והאימייל כבר קיים במערכת.');
      }
    });
  }

// checkPasswordLevel(pass: string) {
//   this.userService.checkPassword(pass).subscribe(strength => {
//     // עדכון ה-ProgressBar (נצטרך להשתמש ב-ViewChild או משתנה)
//     const prog = document.querySelector('.progressBar') as HTMLProgressElement;
//     if(prog) prog.value = strength * 25; // בהנחה שהציון הוא 0-4
//   });
// }
checkPasswordLevel(pass: string) {
    if (!pass) return; // הגנה למקרה של מחרוזת ריקה
    
    this.userService.checkPassword(pass).subscribe({
      next: (strength) => {
        const prog = document.querySelector('.progressBar') as HTMLProgressElement;
        if (prog) prog.value = strength * 25; 
      },
      error: (err) => console.error("Password check failed", err)
    });
  }
}