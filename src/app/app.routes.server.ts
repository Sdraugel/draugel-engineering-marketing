import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Server routes for prerendering. The client router (see app.routes.ts) has
 * two real routes, '' and 'government', plus a wildcard that redirects unknown
 * paths home. The '**' Prerender entry below enumerates and prerenders both
 * named routes to static HTML at build time, so index.html and
 * government/index.html are what crawlers (and users) receive with the full
 * page body already in the markup.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
