"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.string().trim().email("E-mail inválido."),
  message: z.string().trim().min(10, "Mensagem muito curta."),
});

export type ContactFormState = {
  ok: boolean;
  message: string;
};

const initialError = "Não foi possível enviar. Tente novamente ou use o e-mail direto.";

/** Envia contato via webhook n8n ou Resend (variáveis de ambiente opcionais). */
export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return { ok: false, message: firstIssue };
  }

  const { name, email, message } = parsed.data;
  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const contactEmail = process.env.CONTACT_EMAIL?.trim();

  try {
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source: "portfolio-contact" }),
      });
      if (!response.ok) throw new Error(`Webhook ${response.status}`);
      return { ok: true, message: "Mensagem enviada! Respondo em breve." };
    }

    if (resendKey && contactEmail) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio <onboarding@resend.dev>",
          to: contactEmail,
          reply_to: email,
          subject: `Contato do portfólio — ${name}`,
          text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
        }),
      });
      if (!response.ok) throw new Error(`Resend ${response.status}`);
      return { ok: true, message: "Mensagem enviada! Respondo em breve." };
    }

    return {
      ok: false,
      message:
        "Formulário não configurado no servidor. Use o link de e-mail acima ou configure N8N_CONTACT_WEBHOOK_URL.",
    };
  } catch {
    return { ok: false, message: initialError };
  }
}
