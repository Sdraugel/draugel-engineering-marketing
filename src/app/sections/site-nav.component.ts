import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NAV_LINKS, PRIMARY_CTA } from '../data/site';

@Component({
  selector: 'app-site-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="fixed inset-x-0 top-0 z-50 border-b border-line bg-base/95">
      <nav
        class="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6 md:px-10"
        aria-label="Primary"
      >
        <a href="#top" class="group flex items-center gap-2.5">
          <span
            class="grid h-[18px] w-[18px] place-items-center rounded-xs border border-line-strong transition-colors group-hover:border-accent"
          >
            <span class="h-[6px] w-[6px] rounded-[1px] bg-accent"></span>
          </span>
          <span class="text-[15px] tracking-tight">
            <span class="font-medium text-ink">Draugel</span>
            <span class="text-muted">Engineering</span>
          </span>
        </a>

        <div class="flex items-center gap-1 md:gap-2">
          <ul class="mr-2 hidden items-center gap-1 md:flex">
            @for (link of links; track link.href) {
              <li>
                <a
                  [href]="link.href"
                  class="rounded-sm px-3 py-2 font-mono text-[12.5px] text-muted transition-colors hover:text-ink"
                  >{{ link.label }}</a
                >
              </li>
            }
          </ul>
          <a
            [href]="cta.href"
            class="whitespace-nowrap rounded-sm bg-accent px-4 py-2 text-[13px] font-medium text-[var(--color-accent-ink)] transition-[filter,transform] hover:brightness-110 active:translate-y-px"
            >{{ cta.navLabel }}</a
          >
        </div>
      </nav>
    </header>
  `,
})
export class SiteNavComponent {
  protected readonly links = NAV_LINKS;
  protected readonly cta = PRIMARY_CTA;
}
