/**
 * Integration config. These two constants are the ONLY things you need to fill
 * in to make the contact section fully live. Both are intentionally empty so the
 * UI renders in a clearly stubbed, not-yet-wired state.
 */

// TODO wire scheduler: paste your scheduling link (Cal.com, SavvyCal, Calendly,
// etc.). While empty, the "Book a 30-minute call" button renders but stays inert
// (no dead outbound link); the contact form and direct email are the fallback.
export const SCHEDULER_URL = '';

// TODO wire form endpoint: point this at a Cloudflare Pages Function
// (recommended), e.g. '/api/contact', that forwards the message to email.
// While empty, postContact() is a no-op that resolves so the success state can
// show, and that success state tells the visitor to email directly as a
// fallback. Do not use a raw HTML form post.
export const FORM_ENDPOINT = '';

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
    // Stub: not wired yet. Resolve so the success state (with the email
    // fallback) is shown. TODO wire form endpoint above.
    return;
  }
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Contact endpoint returned ${res.status}`);
  }
}
