'use server'
import 'server-only'
import * as EmailValidator from 'email-validator';

const requestTeamInvite = async (email: unknown): Promise<'success' | { error: string }> => {
  if (typeof email !== 'string' || !EmailValidator.validate(email)) {
    return { error: 'Ungültige E-Mail-Adresse' };
  }
  if (process.env.ALLOWED_DOMAINS === undefined || process.env.ALLOWED_DOMAINS.trim() === '') {
    return { error: 'Keine erlaubten Domains konfiguriert' };
  }
  const allowedDomains = process.env.ALLOWED_DOMAINS.split(',').map((domain) => domain.trim().toLowerCase());
  const domainPart = email.slice(email.lastIndexOf('@') + 1).toLowerCase();
  if (!allowedDomains.includes(domainPart)) {
    let errorMsg = 'Die Domain deiner E-Mail-Adresse ist nicht erlaubt.';
    if (process.env.DOMAIN_HINT) {
      errorMsg += ` ${process.env.DOMAIN_HINT}`;
    }
    return { error: errorMsg };
  }
  if (!process.env.API_URL ||!process.env.API_TOKEN) {
    return { error: 'API-Zugang ist nicht konfiguriert.' };
  }

  try {
    const res = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
        'Accept-Language': 'de',
      },
      body: JSON.stringify([email]),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error('API error:', res.status, res.statusText, await res.text());
      return { error: 'Einladung konnte nicht versendet werden.' };
    }
  } catch (err) {
    console.error('API request failed:', err);
    return { error: 'Einladung konnte nicht versendet werden.' };
  }
  return 'success';
}

export default requestTeamInvite
