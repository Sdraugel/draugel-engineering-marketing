import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { SERVICES } from '../data/site';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="services" class="scroll-mt-20 py-16 md:py-24">
      <div class="mx-auto max-w-[1180px] px-6 md:px-10">
        <div class="max-w-[54ch]" appReveal>
          <span class="block h-px w-9 bg-accent"></span>
          <h2 class="mt-6 text-4xl font-medium tracking-[-0.02em] text-ink md:text-5xl">What you can hire me for.</h2>
          <p class="mt-5 text-[1.05rem] leading-relaxed text-muted">
            Four ways to put principal-level engineering on your roadmap, scoped to what you actually need.
          </p>
        </div>

        <!-- gapless matrix: 1px hairlines show through the grid gap, framed by the border -->
        <div
          class="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2"
        >
          @for (svc of services; track svc.title) {
            <article
              class="bg-surface/25 p-7 transition-colors hover:bg-surface/60 md:p-8"
              [appReveal]="$index * 70"
            >
              <span class="inline-flex rounded-sm border border-line bg-base/50 p-2 text-accent">
                <app-icon [name]="svc.icon" [size]="20" />
              </span>
              <h3 class="mt-5 text-lg font-medium tracking-[-0.01em] text-ink">{{ svc.title }}</h3>
              <p class="mt-2 max-w-[42ch] text-[14.5px] leading-relaxed text-muted">{{ svc.body }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  protected readonly services = SERVICES;
}
