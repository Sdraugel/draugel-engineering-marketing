/**
 * Integration config. These two constants are the ONLY things you need to fill
 * in to make the contact section fully live. Both are intentionally empty so the
 * UI renders in a clearly stubbed, not-yet-wired state.
 */

// Scheduling link (Calendly). When set, the "Book a 30-minute call" button opens
// it in a new tab and the "coming soon" helper disappears.
export const SCHEDULER_URL = 'https://calendly.com/steven-draugelengineering';

// Contact form endpoint: the Cloudflare Pages Function at functions/api/contact.ts.
// It emails submissions to steven@draugelengineering.com once RESEND_API_KEY is
// set in the Pages project (see that file's header for the one-time setup). Until
// then it returns an error and the form falls back to "email Steven directly".
// Under `ng serve` this route does not exist, so the form also shows that
// fallback locally; run `npx wrangler pages dev` to exercise the Function.
export const FORM_ENDPOINT = '/api/contact';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * Single submit path for the contact form. When FORM_ENDPOINT is set this POSTs
 * JSON to it (Cloudflare Pages Function preferred). While unset it resolves as a
 * no-op so the stubbed UI can flow to its success state.
 */
export async function postContact(payload: ContactPayload): Promise<void> {
  if (!FORM_ENDPOINT) {
    // No endpoint configured: resolve so the success state (with the email
    // fallback) is shown.
    return;
  }
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  // Require an explicit { ok: true } JSON body so a dev server returning the SPA
  // shell (HTTP 200 HTML) cannot masquerade as a successful send.
  let ok = res.ok;
  try {
    const data = (await res.json()) as { ok?: boolean };
    ok = ok && data?.ok === true;
  } catch {
    ok = false;
  }
  if (!ok) {
    throw new Error(`Contact endpoint returned ${res.status}`);
  }
}
