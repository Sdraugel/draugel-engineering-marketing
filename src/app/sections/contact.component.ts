import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { CONTACT, IDENTITY, PRIMARY_CTA } from '../data/site';
import { SCHEDULER_URL, postContact } from '../config';

interface ContactRow {
  icon: string;
  label: string;
  href: string;
  external: boolean;
  download?: boolean;
}

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="contact" class="scroll-mt-20 border-t border-line">
      <div class="bp-grid">
        <div
          class="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-6 pt-16 pb-16 md:px-10 md:pt-24 lg:grid-cols-12 lg:gap-14"
        >
          <!-- left: pitch, the single primary CTA, and always-live fallbacks -->
          <div class="lg:col-span-5" appReveal>
            <span class="block h-px w-9 bg-accent"></span>
            <h2 class="mt-6 max-w-[18ch] text-4xl font-medium tracking-[-0.02em] text-ink md:text-5xl">
              {{ contact.headline }}
            </h2>
            <p class="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted">{{ contact.body }}</p>

            <!-- primary CTA: scheduler. Inert until SCHEDULER_URL is set. -->
            <div class="mt-8">
              <button
                type="button"
                (click)="bookCall()"
                [attr.aria-disabled]="!schedulerWired"
                class="group inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 text-[14px] font-medium text-[var(--color-accent-ink)] transition-[filter,transform] hover:brightness-110 active:translate-y-px"
              >
                <app-icon name="calendar" [size]="17" />
                {{ cta.label }}
              </button>
              <p class="mt-3 max-w-[42ch] font-mono text-[11.5px] leading-relaxed text-muted">
                {{ contact.engagement }}
              </p>
              @if (!schedulerWired) {
                <p class="mt-2 font-mono text-[11.5px] leading-relaxed text-muted">
                  Scheduling link coming soon. Use the form, or email below.
                </p>
              }
            </div>

            <!-- tertiary: always-functional plain links -->
            <div class="mt-8 flex flex-col gap-1 border-t border-line pt-6">
              @for (row of rows; track row.label) {
                <a
                  [href]="row.href"
                  [attr.target]="row.external ? '_blank' : null"
                  [attr.rel]="row.external ? 'noopener noreferrer' : null"
                  [attr.download]="row.download ? '' : null"
                  class="group flex items-center gap-3 py-2 transition-colors"
                >
                  <app-icon [name]="row.icon" [size]="17" class="text-muted transition-colors group-hover:text-accent" />
                  <span class="font-mono text-[13.5px] text-ink transition-colors group-hover:text-accent">{{
                    row.label
                  }}</span>
                </a>
              }
              <div class="flex items-center gap-3 py-2">
                <app-icon name="map-pin" [size]="17" class="text-muted" />
                <span class="font-mono text-[13.5px] text-muted">{{ location }}</span>
              </div>
            </div>
          </div>

          <!-- right: contact form. JS-handled, never a raw HTML post. -->
          <div class="lg:col-span-7" appReveal="120">
            @if (status() === 'success') {
              <div class="rounded-lg border border-line bg-surface/40 p-7 md:p-8">
                <div class="flex items-center gap-2 text-accent">
                  <app-icon name="circle-check" [size]="22" />
                  <span class="font-mono text-[12px] text-muted">Message received</span>
                </div>
                <h3 class="mt-4 text-xl font-medium text-ink">Thanks for reaching out.</h3>
                <p class="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-muted">
                  We reply within a couple of days. To be sure it reaches us, you can also email
                  <a class="text-accent underline underline-offset-2" [href]="mailtoHref">{{ contact.emailFallback }}</a>
                  directly.
                </p>
                <button
                  type="button"
                  (click)="reset()"
                  class="mt-6 inline-flex items-center gap-2 rounded-sm border border-line-strong px-4 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Send another message
                </button>
              </div>
            } @else {
              @if (status() === 'error') {
                <div
                  class="mb-5 flex items-start gap-2 rounded-sm border border-danger/40 bg-danger/10 p-3 text-[13px] text-ink"
                >
                  <app-icon name="alert-triangle" [size]="16" class="mt-0.5 text-danger" />
                  <span>
                    Something went wrong sending your message. Please email
                    <a class="text-accent underline underline-offset-2" [href]="mailtoHref">{{ contact.emailFallback }}</a>
                    directly.
                  </span>
                </div>
              }

              <form (submit)="onSubmit($event)" novalidate class="grid gap-5">
                <div class="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label for="c-name" class="block font-mono text-[12px] text-muted">Name</label>
                    <input
                      id="c-name"
                      type="text"
                      autocomplete="name"
                      placeholder="Your name"
                      [value]="name()"
                      (input)="name.set(val($event))"
                      (blur)="nameTouched.set(true)"
                      [attr.aria-invalid]="!!nameError()"
                      [attr.aria-describedby]="nameError() ? 'c-name-err' : null"
                      class="mt-1.5 w-full rounded-sm border bg-base/40 px-3 py-2.5 text-[14px] text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                      [class.border-line]="!nameError()"
                      [class.border-danger]="!!nameError()"
                    />
                    @if (nameError()) {
                      <p id="c-name-err" class="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-danger">
                        <app-icon name="alert-triangle" [size]="13" />
                        {{ nameError() }}
                      </p>
                    }
                  </div>

                  <div>
                    <label for="c-email" class="block font-mono text-[12px] text-muted">Email</label>
                    <input
                      id="c-email"
                      type="email"
                      inputmode="email"
                      autocomplete="email"
                      placeholder="you@company.com"
                      [value]="email()"
                      (input)="email.set(val($event))"
                      (blur)="emailTouched.set(true)"
                      [attr.aria-invalid]="!!emailError()"
                      [attr.aria-describedby]="emailError() ? 'c-email-err' : null"
                      class="mt-1.5 w-full rounded-sm border bg-base/40 px-3 py-2.5 text-[14px] text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                      [class.border-line]="!emailError()"
                      [class.border-danger]="!!emailError()"
                    />
                    @if (emailError()) {
                      <p id="c-email-err" class="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-danger">
                        <app-icon name="alert-triangle" [size]="13" />
                        {{ emailError() }}
                      </p>
                    }
                  </div>
                </div>

                <div>
                  <label for="c-message" class="block font-mono text-[12px] text-muted">Message</label>
                  <textarea
                    id="c-message"
                    rows="5"
                    placeholder="What are you building, and where do you need help?"
                    [value]="message()"
                    (input)="message.set(val($event))"
                    (blur)="messageTouched.set(true)"
                    [attr.aria-invalid]="!!messageError()"
                    [attr.aria-describedby]="messageError() ? 'c-message-err' : null"
                    class="mt-1.5 w-full resize-y rounded-sm border bg-base/40 px-3 py-2.5 text-[14px] leading-relaxed text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                    [class.border-line]="!messageError()"
                    [class.border-danger]="!!messageError()"
                  ></textarea>
                  @if (messageError()) {
                    <p id="c-message-err" class="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-danger">
                      <app-icon name="alert-triangle" [size]="13" />
                      {{ messageError() }}
                    </p>
                  }
                </div>

                <div>
                  <button
                    type="submit"
                    [disabled]="status() === 'submitting'"
                    class="inline-flex items-center gap-2 rounded-sm border border-line-strong px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <app-icon name="send" [size]="16" />
                    {{ status() === 'submitting' ? 'Sending...' : 'Send message' }}
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected readonly contact = CONTACT;
  protected readonly cta = PRIMARY_CTA;
  protected readonly location = IDENTITY.location;
  protected readonly mailtoHref = `mailto:${IDENTITY.email}`;
  protected readonly schedulerWired = SCHEDULER_URL.length > 0;

  protected readonly rows: ContactRow[] = [
    { icon: 'mail', label: IDENTITY.email, href: `mailto:${IDENTITY.email}`, external: false },
    { icon: 'linkedin', label: IDENTITY.linkedin.label, href: IDENTITY.linkedin.href, external: true },
    { icon: 'github', label: IDENTITY.github.label, href: IDENTITY.github.href, external: true },
    { icon: 'download', label: 'Download resume', href: IDENTITY.resume, external: false, download: true },
  ];

  // form state
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly message = signal('');
  protected readonly nameTouched = signal(false);
  protected readonly emailTouched = signal(false);
  protected readonly messageTouched = signal(false);
  protected readonly attempted = signal(false);
  protected readonly status = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');

  private readonly emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim()));

  protected readonly nameError = computed(() =>
    (this.nameTouched() || this.attempted()) && this.name().trim().length === 0 ? 'Please enter your name.' : '',
  );
  protected readonly emailError = computed(() =>
    (this.emailTouched() || this.attempted()) && !this.emailValid() ? 'Please enter a valid email address.' : '',
  );
  protected readonly messageError = computed(() =>
    (this.messageTouched() || this.attempted()) && this.message().trim().length < 10
      ? 'Please add a little more detail.'
      : '',
  );

  protected val(event: Event): string {
    return (event.target as HTMLInputElement | HTMLTextAreaElement).value;
  }

  protected bookCall(): void {
    // TODO wire scheduler: while SCHEDULER_URL is empty this is intentionally
    // inert (no dead outbound link); the form and email below are the fallback.
    if (this.schedulerWired) {
      window.open(SCHEDULER_URL, '_blank', 'noopener');
    }
  }

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.attempted.set(true);
    if (this.nameError() || this.emailError() || this.messageError()) return;

    this.status.set('submitting');
    try {
      await postContact({ name: this.name().trim(), email: this.email().trim(), message: this.message().trim() });
      this.status.set('success');
    } catch {
      this.status.set('error');
    }
  }

  protected reset(): void {
    this.name.set('');
    this.email.set('');
    this.message.set('');
    this.nameTouched.set(false);
    this.emailTouched.set(false);
    this.messageTouched.set(false);
    this.attempted.set(false);
    this.status.set('idle');
  }
}
