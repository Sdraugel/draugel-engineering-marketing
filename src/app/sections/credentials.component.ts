import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { CREDENTIALS } from '../data/site';

@Component({
  selector: 'app-credentials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective],
  template: `
    <section class="border-y border-line bg-surface/40">
      <div
        class="mx-auto grid max-w-[1180px] grid-cols-1 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0"
      >
        @for (cred of credentials; track cred.label) {
          <div class="px-6 py-9 md:px-10" [appReveal]="$index * 90">
            <div class="flex items-center gap-2.5 text-accent">
              <app-icon [name]="cred.icon" [size]="18" />
              <span class="font-mono text-[12px] tracking-[0.04em] text-muted">{{ cred.label }}</span>
            </div>
            <p class="mt-4 text-[1.35rem] font-medium tracking-[-0.01em] text-ink">{{ cred.value }}</p>
            <p class="mt-2 text-[13.5px] leading-relaxed text-muted">{{ cred.note }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class CredentialsComponent {
  protected readonly credentials = CREDENTIALS;
}
