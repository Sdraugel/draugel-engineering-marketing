import { Directive, ElementRef, afterNextRender, inject, input, OnDestroy } from '@angular/core';

/**
 * Scroll reveal via IntersectionObserver. No window scroll listeners.
 * Hidden state is set synchronously in the constructor so there is no flash
 * before first paint. Collapses to fully visible under prefers-reduced-motion.
 *
 * Usage: <div appReveal>...</div> or <div [appReveal]="120">...</div> (delay ms)
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  // Accepts a bare `appReveal`, a string `appReveal="120"`, or `[appReveal]="n"`.
  readonly delay = input(0, {
    alias: 'appReveal',
    transform: (value: string | number) => Number(value) || 0,
  });

  private observer?: IntersectionObserver;

  constructor() {
    // Set the pre-reveal state immediately to avoid a flash of final content.
    this.host.nativeElement.setAttribute('data-reveal', '');

    afterNextRender(() => {
      const node = this.host.nativeElement;
      const ms = Number(this.delay()) || 0;
      if (ms) node.style.setProperty('--reveal-delay', `${ms}ms`);

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        node.setAttribute('data-reveal', 'visible');
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.setAttribute('data-reveal', 'visible');
              this.observer?.unobserve(node);
            }
          }
        },
        { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
      );
      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
