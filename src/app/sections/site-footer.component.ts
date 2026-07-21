import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IDENTITY } from '../data/site';

/**
 * Shared site footer, rendered once in the app shell so it appears on every
 * route. Carries the copyright, location, and the cross-link into the
 * government and public sector page (its only entry point from the commercial
 * home page now that government content has moved off the homepage).
 */
@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-line">
      <div
        class="mx-auto flex max-w-[1180px] flex-col gap-3 px-6 py-7 font-mono text-[12px] text-muted md:flex-row md:items-center md:justify-between md:px-10"
      >
        <span>&copy; 2026 {{ firm }}</span>
        <a routerLink="/government" class="transition-colors hover:text-accent"> Government and public sector </a>
        <span>{{ location }}</span>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  protected readonly firm = IDENTITY.firm;
  protected readonly location = IDENTITY.location;
}
