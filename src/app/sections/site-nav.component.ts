import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_LINKS, PRIMARY_CTA } from '../data/site';

interface NavItem {
  label: string;
  routerLink: string;
  fragment?: string;
}

@Component({
  selector: 'app-site-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sticky top-0 z-50 block' },
  imports: [RouterLink],
  template: `
    <header class="border-b border-line bg-base/95">
      <nav
        class="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6 md:px-10"
        aria-label="Primary"
      >
        <a routerLink="/" class="group flex items-center gap-2.5" aria-label="Draugel Engineering — home">
          <img
            src="logo-mark.png"
            alt=""
            width="371"
            height="464"
            class="h-7 w-auto transition-transform group-hover:scale-105"
          />
          <span class="text-[15px] tracking-tight">
            <span class="font-medium text-ink">Draugel</span>
            <span class="text-muted">Engineering</span>
          </span>
        </a>

        <div class="flex items-center gap-1 md:gap-2">
          <ul class="mr-2 hidden items-center gap-1 md:flex">
            @for (link of items; track link.label) {
              <li>
                <a
                  [routerLink]="link.routerLink"
                  [fragment]="link.fragment"
                  class="rounded-sm px-3 py-2 font-mono text-[12.5px] text-muted transition-colors hover:text-ink"
                  >{{ link.label }}</a
                >
              </li>
            }
          </ul>
          <a
            routerLink="/"
            [fragment]="ctaFragment"
            class="whitespace-nowrap rounded-sm bg-accent px-4 py-2 text-[13px] font-medium text-[var(--color-accent-ink)] transition-[filter,transform] hover:brightness-110 active:translate-y-px"
            >{{ cta.navLabel }}</a
          >
        </div>
      </nav>
    </header>
  `,
})
export class SiteNavComponent {
  protected readonly cta = PRIMARY_CTA;
  protected readonly ctaFragment = PRIMARY_CTA.href.replace(/^#/, '');

  // The nav data lives in site.ts as fragment hrefs (e.g. '#services'). Home
  // sections stay fragment links; the capabilities entry now routes to the
  // dedicated /government page instead of a homepage anchor.
  protected readonly items: NavItem[] = NAV_LINKS.map((link) => {
    const fragment = link.href.replace(/^#/, '');
    return fragment === 'capabilities'
      ? { label: link.label, routerLink: '/government' }
      : { label: link.label, routerLink: '/', fragment };
  });
}
