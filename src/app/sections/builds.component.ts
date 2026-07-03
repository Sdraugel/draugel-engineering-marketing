import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';
import { BUILDS } from '../data/site';

@Component({
  selector: 'app-builds',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section id="builds" class="scroll-mt-20 border-t border-line bg-surface/20 py-16 md:py-24">
      <div class="mx-auto max-w-[1180px] px-6 md:px-10">
        <div class="max-w-[58ch]" appReveal>
          <span class="block h-px w-9 bg-accent"></span>
          <h2 class="mt-6 text-4xl font-medium tracking-[-0.02em] text-ink md:text-5xl">Notable builds.</h2>
          <p class="mt-5 text-[1rem] leading-relaxed text-muted">
            Platforms and products built over more than a decade, described by what they delivered. Some are cleared
            or proprietary, so the work is named, not the client.
          </p>
        </div>

        <div class="mt-10 border-t border-line">
          @for (item of builds; track item.title) {
            <div
              class="grid grid-cols-1 gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8"
              [appReveal]="$index * 70"
            >
              <div class="md:col-span-5">
                <h3 class="text-xl font-medium tracking-[-0.01em] text-ink">{{ item.title }}</h3>
                <span class="mt-2 inline-block font-mono text-[12px] text-accent">{{ item.context }}</span>
              </div>
              <p class="text-[1rem] leading-relaxed text-muted md:col-span-7">{{ item.body }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class BuildsComponent {
  protected readonly builds = BUILDS;
}
