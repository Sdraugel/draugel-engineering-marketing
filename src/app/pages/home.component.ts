import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../sections/hero.component';
import { CredentialsComponent } from '../sections/credentials.component';
import { ServicesComponent } from '../sections/services.component';
import { BuildsComponent } from '../sections/builds.component';
import { WorkClientComponent } from '../sections/work-client.component';
import { FounderProductComponent } from '../sections/founder-product.component';
import { TestimonialComponent } from '../sections/testimonial.component';
import { AboutComponent } from '../sections/about.component';
import { SkillsComponent } from '../sections/skills.component';
import { ContactComponent } from '../sections/contact.component';

/**
 * Commercial home page. Government and public sector content now lives on its
 * own /government route, so it is intentionally absent here. Notable builds is
 * pulled up directly after What we build, so the page reads
 * What we build -> Notable builds -> Selected work.
 */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    CredentialsComponent,
    ServicesComponent,
    BuildsComponent,
    WorkClientComponent,
    FounderProductComponent,
    TestimonialComponent,
    AboutComponent,
    SkillsComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-credentials />
    <app-services />
    <app-builds />
    <app-work-client />
    <app-founder-product />
    <!-- Client testimonials (populated in TESTIMONIALS in site.ts) -->
    <app-testimonial />
    <app-about />
    <app-skills />
    <app-contact />
  `,
})
export class HomeComponent {}
