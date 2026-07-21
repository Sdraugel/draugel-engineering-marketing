import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';
import { TESTIMONIALS } from '../data/site';

/**
 * Client testimonials, shown between Selected Work and Notable Builds. Renders
 * only when there is at least one real quote in TESTIMONIALS.
 */
@Component({
  selector: 'app-testimonial',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    @if (testimonials.length) {
      <section id="testimonials" class="scroll-mt-20 border-t border-line py-16 md:py-24">
        <div class="mx-auto max-w-[1180px] px-6 md:px-10">
          <div appReveal>
            <span class="block h-px w-9 bg-accent"></span>
            <h2 class="mt-6 text-4xl font-medium tracking-[-0.02em] text-ink md:text-5xl">What clients say.</h2>
          </div>

          <div
            class="mt-10 grid grid-cols-1 gap-4 md:items-start"
            [class.md:grid-cols-2]="testimonials.length > 1"
          >
            @for (item of testimonials; track item.name) {
              <figure
                class="rounded-lg border border-line bg-surface/40 p-7 md:p-8"
                [class.max-w-xl]="testimonials.length === 1"
                [appReveal]="$index * 80"
              >
                <blockquote class="text-[1.05rem] italic leading-relaxed text-ink">“{{ item.quote }}”</blockquote>
                <figcaption class="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-4">
                  <span class="font-mono text-[13px] text-ink">{{ item.name }}</span>
                  <span class="font-mono text-[12px] text-muted">{{ item.org }}</span>
                </figcaption>
              </figure>
            }
          </div>
        </div>
      </section>
    }
  `,
})
export class TestimonialComponent {
  protected readonly testimonials = TESTIMONIALS;
}
