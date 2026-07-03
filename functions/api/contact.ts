/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Receives the contact form submission and emails it to Steven. Workers cannot
 * send SMTP directly, so this hands off to Resend (https://resend.com), which
 * has a free tier and a one-field setup.
 *
 * ONE-TIME SETUP (all in the Cloudflare Pages project, no code changes):
 *   1. Create a Resend account using steven@draugelengineering.com.
 *   2. Resend dashboard -> API Keys -> create one.
 *   3. Cloudflare Pages -> your project -> Settings -> Variables and Secrets ->
 *      add a SECRET named RESEND_API_KEY with that key. Redeploy.
 *
 * That is enough: the default sender "onboarding@resend.dev" is allowed to send
 * to your own account email (steven@draugelengineering.com). Once you verify
 * draugelengineering.com in Resend you can set the optional CONTACT_FROM
 * variable to something like "Draugel Engineering <hello@draugelengineering.com>".
 *
 * Optional variables: CONTACT_TO (defaults to steven@draugelengineering.com),
 * CONTACT_FROM (defaults to the Resend onboarding sender).
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const isEmail = (value: unknown): value is string =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  let payload: { name?: unknown; email?: unknown; message?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = isEmail(payload.email) ? String(payload.email).trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || !email || message.length < 10) {
    return json({ error: 'Please provide a name, a valid email, and a message.' }, 400);
  }

  if (!env.RESEND_API_KEY) {
    // Not wired yet. The client falls back to "email Steven directly".
    return json({ error: 'Email delivery is not configured yet.' }, 503);
  }

  const to = env.CONTACT_TO || 'steven@draugelengineering.com';
  const from = env.CONTACT_FROM || 'Draugel Engineering <onboarding@resend.dev>';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `New contact request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return json({ error: 'Could not send the message.' }, 502);
  }

  return json({ ok: true }, 200);
};
