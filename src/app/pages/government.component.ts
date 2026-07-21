import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CapabilitiesComponent } from '../sections/capabilities.component';

const GOVERNMENT_DESCRIPTION =
  'Draugel Engineering is a veteran-owned SDVOSB software firm in Charleston delivering AI, cloud, and full-stack engineering for federal and public sector programs. Capability statement, NAICS codes, and past performance.';

/**
 * Government and public sector page. Split out of the commercial home page so
 * federal BD, contracting officers, and primes land on a focused capability
 * statement. The capabilities section carries all of the fact-sheet content
 * (company data, NAICS, competencies, past performance, and the PDF download).
 * Sets its own meta description and og:description, distinct from the home
 * page, so this route carries its own SEO identity in the prerendered HTML.
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
export class GovernmentComponent {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
  ) {
    this.title.setTitle('Government and public sector | Draugel Engineering, LLC');
    this.meta.updateTag({ name: 'description', content: GOVERNMENT_DESCRIPTION });
    this.meta.updateTag({ property: 'og:description', content: GOVERNMENT_DESCRIPTION });
  }
}
