import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { FOUNDER_PRODUCT } from '../data/site';

@Component({
  selector: 'app-founder-product',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="product" class="scroll-mt-20 pb-16 md:pb-24">
      <div class="mx-auto max-w-[1180px] px-6 md:px-10">
        <div appReveal>
          <div class="flex items-center gap-4">
            <span class="font-mono text-[12.5px] text-ink">Founder product</span>
            <span class="h-px flex-1 bg-line"></span>
          </div>
          <p class="mt-4 max-w-[62ch] text-[1rem] leading-relaxed text-muted">
            The firm's own product, engineered end to end. Proof we build production-grade systems, not just
            features.
          </p>
        </div>

        <article class="mt-6 overflow-hidden rounded-lg border border-line bg-surface/40" appReveal="60">
          <div class="overflow-hidden border-b border-line">
            <img
              [src]="product.image"
              [alt]="product.imageAlt"
              loading="lazy"
              class="aspect-[16/9] w-full object-cover object-top"
            />
          </div>

          <div class="p-6 md:p-9">
            <div class="flex flex-wrap items-center gap-3">
              <span
                class="rounded-sm border border-accent/45 px-2 py-0.5 font-mono text-[11px] tracking-[0.02em] text-accent"
                >Early access</span
              >
              <span class="font-mono text-[12px] text-muted">{{ product.org }}</span>
            </div>

            <h3 class="mt-4 text-2xl font-medium tracking-[-0.01em] text-ink md:text-3xl">{{ product.name }}</h3>
            <p class="mt-3 max-w-[62ch] text-[1.05rem] leading-relaxed text-muted">{{ product.summary }}</p>

            <!-- horizontal meta band: role and outcome side by side -->
            <div class="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-7 sm:grid-cols-2">
              <div>
                <p class="font-mono text-[11px] text-muted">Role</p>
                <p class="mt-1.5 text-[15px] text-ink">{{ product.role }}</p>
              </div>
              <div>
                <p class="font-mono text-[11px] text-muted">Outcome</p>
                <p class="mt-1.5 text-[15px] text-ink">{{ product.outcome }}</p>
              </div>
            </div>

            <div class="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <ul class="flex flex-wrap gap-2">
                @for (tag of product.tags; track tag) {
                  <li class="rounded-sm border border-line bg-base/40 px-2.5 py-1 font-mono text-[12px] text-muted">
                    {{ tag }}
                  </li>
                }
              </ul>
              <a
                [href]="product.link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-2 self-start rounded-sm border border-line-strong px-4 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:border-accent hover:text-accent sm:self-auto"
              >
                {{ product.link.label }}
                <app-icon name="external-link" [size]="16" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
})
export class FounderProductComponent {
  protected readonly product = FOUNDER_PRODUCT;
}
