import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SiteNavComponent } from './sections/site-nav.component';
import { HeroComponent } from './sections/hero.component';
import { CredentialsComponent } from './sections/credentials.component';
import { ServicesComponent } from './sections/services.component';
import { WorkClientComponent } from './sections/work-client.component';
import { FounderProductComponent } from './sections/founder-product.component';
import { TestimonialComponent } from './sections/testimonial.component';
import { BuildsComponent } from './sections/builds.component';
import { AboutComponent } from './sections/about.component';
import { SkillsComponent } from './sections/skills.component';
import { CapabilitiesComponent } from './sections/capabilities.component';
import { ContactComponent } from './sections/contact.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SiteNavComponent,
    HeroComponent,
    CredentialsComponent,
    ServicesComponent,
    WorkClientComponent,
    FounderProductComponent,
    TestimonialComponent,
    BuildsComponent,
    AboutComponent,
    SkillsComponent,
    CapabilitiesComponent,
    ContactComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
