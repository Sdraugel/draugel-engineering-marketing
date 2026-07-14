import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

/**
 * Server/prerender config. Merged onto the browser appConfig so the single
 * root route is rendered to static HTML at build time (outputMode: static in
 * angular.json). This is what makes the full page body crawlable instead of an
 * empty <app-root>. No Node server ships; Cloudflare Pages serves the static
 * prerendered index.html.
 */
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
