import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { CLIENT_WORK } from '../data/site';

@Component({
  selector: 'app-work-client',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="work" class="scroll-mt-20 pt-16 pb-12 md:pt-24 md:pb-16">
      <div class="mx-auto max-w-[1180px] px-6 md:px-10">
        <div class="max-w-[60ch]" appReveal>
          <span class="block h-px w-9 bg-accent"></span>
          <h2 class="mt-6 text-4xl font-medium tracking-[-0.02em] text-ink md:text-5xl lg:text-[3.4rem]">
            Selected work.
          </h2>
          <p class="mt-5 text-[1.05rem] leading-relaxed text-muted">
            Live platforms, designed and built end to end. Client work first, then the firm's own product.
          </p>
        </div>

        <div class="mt-10 flex items-center gap-4" appReveal>
          <span class="font-mono text-[12.5px] text-ink">Client work</span>
          <span class="h-px flex-1 bg-line"></span>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          @for (item of clients; track item.name) {
            <article
              class="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface/40"
              [appReveal]="$index * 90"
            >
              <div class="overflow-hidden border-b border-line">
                <img
                  [src]="item.image"
                  [alt]="item.imageAlt"
                  loading="lazy"
                  class="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div class="flex flex-1 flex-col p-6">
                <div class="flex items-baseline justify-between gap-3">
                  <h3 class="text-xl font-medium tracking-[-0.01em] text-ink">{{ item.name }}</h3>
                  <span class="font-mono text-[12px] text-muted">{{ item.org }}</span>
                </div>
                <p class="mt-2 font-mono text-[12px] text-accent">{{ item.role }}</p>
                <p class="mt-3 text-[14.5px] leading-relaxed text-muted">{{ item.summary }}</p>
                <p class="mt-4 border-l-2 border-accent pl-3 text-[13.5px] leading-relaxed text-ink">
                  {{ item.outcome }}
                </p>
                <ul class="mt-5 flex flex-wrap gap-2">
                  @for (tag of item.tags; track tag) {
                    <li class="rounded-sm border border-line bg-base/40 px-2.5 py-1 font-mono text-[12px] text-muted">
                      {{ tag }}
                    </li>
                  }
                </ul>
                <a
                  [href]="item.link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-6 inline-flex items-center gap-1.5 self-start font-mono text-[13px] text-muted transition-colors hover:text-accent"
                >
                  {{ item.link.label }}
                  <app-icon name="arrow-up-right" [size]="15" />
                </a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class WorkClientComponent {
  protected readonly clients = CLIENT_WORK;
}
