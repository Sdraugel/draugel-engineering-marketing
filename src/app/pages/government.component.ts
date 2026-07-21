import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapabilitiesComponent } from '../sections/capabilities.component';

/**
 * Government and public sector page. Split out of the commercial home page so
 * federal BD, contracting officers, and primes land on a focused capability
 * statement. The capabilities section carries all of the fact-sheet content
 * (company data, NAICS, competencies, past performance, and the PDF download).
 */
@Component({
  selector: 'app-government',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CapabilitiesComponent],
  template: `
    <div class="mx-auto max-w-[1180px] px-6 pt-10 md:px-10 md:pt-14">
      <a
        routerLink="/"
        class="inline-flex items-center gap-2 font-mono text-[12.5px] text-muted transition-colors hover:text-accent"
      >
        <span aria-hidden="true">&larr;</span>
        Back to home
      </a>
    </div>
    <app-capabilities />
  `,
})
export class GovernmentComponent {}
