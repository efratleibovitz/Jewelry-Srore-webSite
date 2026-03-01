import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'; // ייבוא ערכת הנושא החדשה
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({
        theme: {
            preset: Aura // כאן אנחנו קובעים את העיצוב (Aura הוא העיצוב המומלץ)
        }
    }),
    provideRouter(routes),
    provideHttpClient(),
    

  ]
};
