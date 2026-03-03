// user.service.ts
import { Injectable , signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , tap, catchError, of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://localhost:44320/api/Users';
  currentUser = signal<any>(null);
  constructor(private http: HttpClient) {
    this.loadUserFromStorage(); // טוען את המשתמש מה-Storage כשסרוויס נוצר
  }

//   register(userData: any): Observable<any> {
//     return this.http.post(this.apiUrl, userData);
//   }

register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData).pipe(
      tap(user => this.handleAuthSuccess(user))
    );
  }

//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/Login`, credentials);
//   }
// כניסה - credentials מכיל רק Email ו-Password (תואם ל-UserLoginDto בשרת)
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, credentials).pipe(
      tap(user => this.handleAuthSuccess(user))
    );
  }

  private handleAuthSuccess(user: any) {
    if (user) {
      this.currentUser.set(user);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

// פונקציה לבדיקה אם יש משתמש שמור כשהאתר עולה
loadUserFromStorage() {
    try {
      const savedUser = sessionStorage.getItem('user');
      if (savedUser) {
        this.currentUser.set(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Error loading user from storage", e);
      this.logout(); // אם המידע ב-Storage משובש, ננקה אותו
    }
  }


  logout() {
    this.currentUser.set(null);
    sessionStorage.removeItem('user');
  }
  
  getCurrentUser() {
    return this.currentUser();
  }
  
  isUserLoggedIn() {
    return this.currentUser() !== null;
  }

  checkPassword(password: string): Observable<number> {
    return this.http.post<number>('https://localhost:44320/api/Password', JSON.stringify(password), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

updateUserFields(id: number, userData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, userData).pipe(
    tap(updatedInfo => {
      const current = this.currentUser();
      // אנחנו ממזגים את המידע החדש לתוך הקיים
      const newData = { ...current, ...updatedInfo };
      this.currentUser.set(newData);
      sessionStorage.setItem('user', JSON.stringify(newData));
    })
  );
}
}