import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter,withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'; // ייבוא ערכת הנושא החדשה
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({
      
        theme: {
            preset: Aura // כאן אנחנו קובעים את העיצוב (Aura הוא העיצוב המומלץ)
        }
    }),

      provideRouter(
      routes,
      
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'disabled'
      })
    ),
    provideHttpClient()


  ]
};
