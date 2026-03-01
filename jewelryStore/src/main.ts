import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
alert('הנה אני! האנגולר באמת עולה'); // הוסיפי את השורה הזו
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
