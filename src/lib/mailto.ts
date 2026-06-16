/** Monta URL mailto: com assunto e corpo opcionais (página de contato). */
export function buildMailtoUrl(
  email: string,
  options?: { subject?: string; body?: string },
): string {
  const params = new URLSearchParams();
  if (options?.subject) params.set("subject", options.subject);
  if (options?.body) params.set("body", options.body);

  const query = params.toString();
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}
