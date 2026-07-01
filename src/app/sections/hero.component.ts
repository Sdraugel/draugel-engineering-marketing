import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { HERO } from '../data/site';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <section id="top" class="relative overflow-hidden">
      <!-- signature blueprint texture, very faint -->
      <div class="bp-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true"></div>
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
        aria-hidden="true"
      ></div>

      <div
        class="relative mx-auto w-full max-w-[1180px] px-6 pt-14 pb-16 md:px-10 md:pt-20 md:pb-24"
      >
        <div class="max-w-[52rem]">
          <p
            class="enter flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
            style="--enter-delay:0ms"
          >
            <span class="h-px w-7 bg-accent"></span>
            {{ hero.eyebrow }}
          </p>

          <h1
            class="enter mt-6 text-[2rem] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.45rem] md:text-[2.8rem] lg:text-[3.05rem]"
            style="--enter-delay:90ms"
          >
            <span class="block"><span class="text-accent">{{ hero.accentWord }}</span>{{ hero.headlineTail }}</span>
            <span class="block">{{ hero.headlineLine2 }}</span>
          </h1>

          <p
            class="enter mt-7 max-w-[50ch] text-[1.05rem] leading-relaxed text-muted md:text-[1.15rem]"
            style="--enter-delay:180ms"
          >
            {{ hero.subtext }}
          </p>

          <div class="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style="--enter-delay:270ms">
            <a
              [href]="hero.primary.href"
              class="group inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 text-[14px] font-medium text-[var(--color-accent-ink)] transition-[filter,transform] hover:brightness-110 active:translate-y-px"
            >
              <app-icon name="calendar" [size]="17" />
              {{ hero.primary.label }}
            </a>
            <a
              [href]="hero.secondary.href"
              class="group inline-flex items-center justify-center gap-2 rounded-sm border border-line-strong px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {{ hero.secondary.label }}
              <app-icon
                name="arrow-up-right"
                [size]="16"
                class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly hero = HERO;
}
