import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Reuse the prerendered DOM on the client instead of destroying and
    // re-rendering it. withEventReplay captures clicks fired before hydration.
    provideClientHydration(withEventReplay()),
  ],
};
