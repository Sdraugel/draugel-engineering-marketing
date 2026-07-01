import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { SKILLS } from '../data/site';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="skills" class="border-y border-line bg-surface/30 py-12">
      <div
        class="mx-auto flex max-w-[1180px] flex-col gap-5 px-6 md:flex-row md:items-baseline md:gap-10 md:px-10"
        appReveal
      >
        <div class="flex shrink-0 items-center gap-2 text-accent">
          <app-icon name="stack-2" [size]="16" />
          <span class="font-mono text-[12px] text-muted">{{ skills.label }}</span>
        </div>
        <ul class="flex flex-wrap gap-2">
          @for (item of skills.items; track item) {
            <li class="rounded-sm border border-line bg-base/40 px-2.5 py-1 font-mono text-[12.5px] text-ink">
              {{ item }}
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected readonly skills = SKILLS;
}
