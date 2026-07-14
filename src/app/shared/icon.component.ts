import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Inline icon renderer. Path data is from Tabler Icons (MIT licensed), not
 * hand-drawn. One stroke weight is standardized across the page for a precise,
 * engineered line quality.
 */
const ICON_PATHS: Record<string, string[]> = {
  'arrow-up-right': ['M17 7l-10 10', 'M8 7l9 0l0 9'],
  'arrow-right': ['M5 12l14 0', 'M13 18l6 -6', 'M13 6l6 6'],
  'external-link': [
    'M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6',
    'M11 13l9 -9',
    'M15 4h5v5',
  ],
  mail: [
    'M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10',
    'M3 7l9 6l9 -6',
  ],
  linkedin: [
    'M8 11v5',
    'M8 8v.01',
    'M12 16v-5',
    'M16 16v-3a2 2 0 1 0 -4 0',
    'M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10',
  ],
  github: [
    'M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5',
  ],
  download: ['M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2', 'M7 11l5 5l5 -5', 'M12 4l0 12'],
  'map-pin': [
    'M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0',
    'M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0',
  ],
  'shield-lock': [
    'M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3',
    'M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
    'M12 12l0 2.5',
  ],
  medal: [
    'M9 3h6l3 7l-6 2l-6 -2l3 -7',
    'M12 12l-3 -9',
    'M15 11l-3 -8',
    'M12 19.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5l-3 -1.5',
  ],
  certificate: [
    'M9 15a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
    'M10 7h4',
    'M10 18v4l2 -1l2 1v-4',
    'M10 19h-2a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2',
  ],
  briefcase: [
    'M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9',
    'M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2',
    'M12 12l0 .01',
    'M3 13a20 20 0 0 0 18 0',
  ],
  'stack-2': ['M12 4l-8 4l8 4l8 -4l-8 -4', 'M4 12l8 4l8 -4', 'M4 16l8 4l8 -4'],
  sitemap: [
    'M3 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2',
    'M15 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2',
    'M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2',
    'M6 15v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1',
    'M12 9l0 3',
  ],
  cpu: [
    'M5 6a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -12',
    'M9 9h6v6h-6l0 -6',
    'M3 10h2',
    'M3 14h2',
    'M10 3v2',
    'M14 3v2',
    'M21 10h-2',
    'M21 14h-2',
    'M14 21v-2',
    'M10 21v-2',
  ],
  code: ['M7 8l-4 4l4 4', 'M17 8l4 4l-4 4', 'M14 4l-4 16'],
  'list-search': [
    'M11 15a4 4 0 1 0 8 0a4 4 0 1 0 -8 0',
    'M18.5 18.5l2.5 2.5',
    'M4 6h16',
    'M4 12h4',
    'M4 18h4',
  ],
  'circle-check': ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0', 'M9 12l2 2l4 -4'],
  'alert-triangle': [
    'M12 9v4',
    'M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0',
    'M12 16h.01',
  ],
  calendar: [
    'M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12',
    'M16 3v4',
    'M8 3v4',
    'M4 11h16',
    'M11 15h1',
    'M12 15v3',
  ],
  send: ['M10 14l11 -11', 'M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5'],
  'file-description': [
    'M14 3v4a1 1 0 0 0 1 1h4',
    'M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z',
    'M9 17h6',
    'M9 13h6',
  ],
  'building-bank': [
    'M3 21l18 0',
    'M3 10l18 0',
    'M5 6l7 -3l7 3',
    'M4 10l0 11',
    'M20 10l0 11',
    'M8 14l0 3',
    'M12 14l0 3',
    'M16 14l0 3',
  ],
  hash: ['M5 9l14 0', 'M5 15l14 0', 'M11 4l-4 16', 'M17 4l-4 16'],
};

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0' },
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="weight()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input(18);
  readonly weight = input(1.75);

  protected paths(): string[] {
    return ICON_PATHS[this.name()] ?? [];
  }
}
