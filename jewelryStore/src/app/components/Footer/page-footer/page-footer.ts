import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-page-footer',
  imports: [RouterModule, CommonModule],
  templateUrl: './page-footer.html',
  styleUrl: './page-footer.css',
})
export class PageFooter {
   year = new Date().getFullYear();

  // עדכני נתיב/שם בהתאם לפרויקט שלך
  logoSrc = 'pictures/newlogo.png';
  brandLine = 'עיצוב נקי · נוכחות מדויקת';
}
