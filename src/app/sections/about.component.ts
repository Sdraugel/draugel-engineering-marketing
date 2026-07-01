import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';
import { ABOUT } from '../data/site';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section id="about" class="scroll-mt-20 py-16 md:py-24">
      <div
        class="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-12 md:gap-12 md:px-10 lg:gap-14"
      >
        <!-- duotone headshot: shadows fall to base, highlights to accent -->
        <figure class="mx-auto w-full max-w-[320px] md:col-span-4 md:mx-0 md:max-w-none" appReveal>
          <div class="relative">
            <div
              class="bp-grid pointer-events-none absolute -inset-3 -z-10 rounded-lg border border-line opacity-70"
              aria-hidden="true"
            ></div>
            <div class="relative aspect-square overflow-hidden rounded-lg border border-line-strong bg-surface">
              <img
                src="headshot.jpg"
                alt="Portrait of Steven Draugel, founder of Draugel Engineering."
                width="400"
                height="400"
                class="duotone h-full w-full object-cover"
              />
              <span
                class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/25"
                aria-hidden="true"
              ></span>
            </div>
          </div>
        </figure>

        <div class="md:col-span-8" appReveal="120">
          <span class="block h-px w-9 bg-accent"></span>
          <h2 class="mt-6 text-4xl font-medium tracking-[-0.02em] text-ink md:text-5xl">{{ about.name }}</h2>
          <p class="mt-2 font-mono text-[12.5px] tracking-[0.02em] text-muted">{{ about.role }}</p>

          <div class="mt-6 max-w-[62ch] space-y-5 text-[1.05rem] leading-relaxed text-muted">
            @for (para of about.paragraphs; track $index) {
              <p>{{ para }}</p>
            }
          </div>

          <!-- compact background strip: prior roles, most recent employer unnamed -->
          <dl class="mt-8 flex flex-col gap-x-8 gap-y-3 border-t border-line pt-6 sm:flex-row sm:flex-wrap">
            @for (item of about.background; track item.org) {
              <div class="flex items-baseline gap-2">
                <dt class="text-[13.5px] text-ink">{{ item.org }}</dt>
                <dd class="font-mono text-[11.5px] text-muted">{{ item.note }}</dd>
              </div>
            }
          </dl>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly about = ABOUT;
}
