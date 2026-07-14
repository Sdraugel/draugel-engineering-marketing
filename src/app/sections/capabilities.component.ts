import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { GOVERNMENT, IDENTITY } from '../data/site';

/**
 * Government and public sector capability statement, rendered as an engineered
 * fact sheet for federal BD, contracting officers, and primes. The download
 * button is deliberately a secondary (bordered) style so the accent-filled
 * "Book a call" stays the single primary CTA for the page.
 */
@Component({
  selector: 'app-capabilities',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="capabilities" class="scroll-mt-20 border-t border-line py-16 md:py-24">
      <div class="mx-auto max-w-[1180px] px-6 md:px-10">
        <!-- header + the capability statement download -->
        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between" appReveal>
          <div class="max-w-[60ch]">
            <span class="block h-px w-9 bg-accent"></span>
            <h2 class="mt-6 text-4xl font-medium tracking-[-0.02em] text-ink md:text-5xl">{{ gov.headline }}</h2>
            <p class="mt-5 text-[1.05rem] leading-relaxed text-muted">{{ gov.intro }}</p>
          </div>

          <a
            [href]="statement.href"
            [attr.download]="downloadName"
            class="group inline-flex shrink-0 items-center gap-3 self-start rounded-sm border border-line-strong px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <app-icon name="file-description" [size]="18" class="text-accent" />
            {{ statement.label }}
            <span
              class="rounded-xs border border-line px-1.5 py-0.5 font-mono text-[11px] tracking-[0.06em] text-muted transition-colors group-hover:border-accent group-hover:text-accent"
              >PDF</span
            >
          </a>
        </div>

        <!-- fact sheet: company data | federal past performance, as two
             independent top-aligned cards so unequal content lengths don't
             force a stretched, half-empty panel -->
        <div class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start" appReveal="80">
          <!-- company data spec sheet -->
          <div class="rounded-lg border border-line bg-surface/40 p-7 md:p-8">
            <div class="flex items-center gap-2.5 text-accent">
              <app-icon name="building-bank" [size]="18" />
              <h3 class="font-mono text-[12px] tracking-[0.04em] text-muted">Company data</h3>
            </div>

            <dl class="mt-6 divide-y divide-line">
              @for (row of profile; track row.label) {
                <div class="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt class="shrink-0 font-mono text-[12.5px] text-muted">{{ row.label }}</dt>
                  <dd class="text-[14px] text-ink sm:text-right">
                    {{ row.value }}
                    @if (row.note) {
                      <span class="mt-0.5 block font-mono text-[11.5px] tracking-[0.02em] text-accent">{{
                        row.note
                      }}</span>
                    }
                  </dd>
                </div>
              }
            </dl>

            <p class="mt-6 max-w-[46ch] font-mono text-[11.5px] leading-relaxed text-muted">{{ gov.profileNote }}</p>
          </div>

          <!-- federal past performance -->
          <div class="rounded-lg border border-line bg-surface/40 p-7 md:p-8">
            <div class="flex items-center gap-2.5 text-accent">
              <app-icon name="circle-check" [size]="18" />
              <h3 class="font-mono text-[12px] tracking-[0.04em] text-muted">Federal past performance</h3>
            </div>
            <ul class="mt-6 space-y-4">
              @for (item of pastPerformance; track item.title) {
                <li class="border-l-2 border-accent pl-3">
                  <p class="text-[14px] leading-snug text-ink">{{ item.title }}</p>
                  <p class="mt-1 font-mono text-[12px] text-muted">{{ item.detail }}</p>
                </li>
              }
            </ul>
          </div>
        </div>

        <!-- core competencies: the six capability domains, mirroring the PDF -->
        <div class="mt-4" appReveal="100">
          <div class="flex items-center gap-2.5 text-accent">
            <app-icon name="sitemap" [size]="18" />
            <h3 class="font-mono text-[12px] tracking-[0.04em] text-muted">Core competencies</h3>
          </div>
          <div
            class="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          >
            @for (item of competencies; track item.title) {
              <div class="bg-surface/25 p-5">
                <p class="text-[14px] font-medium tracking-[-0.01em] text-ink">{{ item.title }}</p>
                <p class="mt-1.5 text-[12.5px] leading-snug text-muted">{{ item.blurb }}</p>
              </div>
            }
          </div>
        </div>

        <!-- NAICS codes: same matrix treatment as the fact sheet, no outer card -->
        <div class="mt-4" appReveal="120">
          <div class="flex items-center gap-2.5 text-accent">
            <app-icon name="hash" [size]="18" />
            <h3 class="font-mono text-[12px] tracking-[0.04em] text-muted">NAICS codes</h3>
          </div>
          <div
            class="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
          >
            @for (code of naics; track code.code) {
              <div class="bg-surface/25 p-5">
                <p class="font-mono text-[15px] tracking-[0.02em] text-accent">{{ code.code }}</p>
                <p class="mt-1.5 text-[12.5px] leading-snug text-muted">{{ code.title }}</p>
              </div>
            }
          </div>
        </div>

        <!-- point of contact: Charleston location + direct email -->
        <div
          class="mt-8 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[12.5px] text-muted sm:flex-row sm:items-center sm:gap-8"
          appReveal="140"
        >
          <span class="flex items-center gap-2">
            <app-icon name="map-pin" [size]="15" class="text-accent" />
            {{ location }}
          </span>
          <a class="flex items-center gap-2 transition-colors hover:text-accent" [href]="mailtoHref">
            <app-icon name="mail" [size]="15" class="text-accent" />
            {{ email }}
          </a>
        </div>
      </div>
    </section>
  `,
})
export class CapabilitiesComponent {
  protected readonly gov = GOVERNMENT;
  protected readonly profile = GOVERNMENT.profile;
  protected readonly competencies = GOVERNMENT.competencies;
  protected readonly pastPerformance = GOVERNMENT.pastPerformance;
  protected readonly naics = GOVERNMENT.naics;
  protected readonly statement = GOVERNMENT.capabilityStatement;
  protected readonly downloadName = 'Draugel-Engineering-Capability-Statement.pdf';
  protected readonly location = IDENTITY.location;
  protected readonly email = IDENTITY.email;
  protected readonly mailtoHref = `mailto:${IDENTITY.email}`;
}
