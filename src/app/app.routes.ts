import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { GovernmentComponent } from './pages/government.component';

/**
 * Client routes. The site now splits into a commercial home page and a
 * dedicated government and public sector page. Both are prerendered to static
 * HTML at build time (see app.routes.server.ts). Route titles drive the
 * document title through Angular's default TitleStrategy, so each prerendered
 * page carries its own <title>.
 */
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Draugel Engineering, LLC - Steven Draugel, Principal Full-Stack Engineer',
  },
  {
    path: 'government',
    component: GovernmentComponent,
    title: 'Government and Public Sector - Draugel Engineering, LLC',
  },
  { path: '**', redirectTo: '' },
];
