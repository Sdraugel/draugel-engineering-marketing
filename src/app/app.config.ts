import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Client router: splits the commercial home page and the /government page.
    // Anchor scrolling lets the nav fragment links (Services, Work, About) jump
    // to home-page sections, including from the government route.
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    // Reuse the prerendered DOM on the client instead of destroying and
    // re-rendering it. withEventReplay captures clicks fired before hydration.
    provideClientHydration(withEventReplay()),
  ],
};
