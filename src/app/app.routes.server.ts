import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Server routes for prerendering. This is a single-page site with no client
 * router, so the one catch-all route is prerendered to static HTML at build
 * time. That prerendered index.html is what crawlers (and users) receive with
 * the full page body already in the markup.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
