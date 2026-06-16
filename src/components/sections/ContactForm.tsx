"use client";

import { useActionState } from "react";
import { submitContact, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { ok: false, message: "" };

const fieldClass =
  "rounded-card border border-secondary bg-transparent px-4 py-3 text-foreground outline-none focus-visible:border-accent";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  return (
    <form action={action} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="caps text-muted">Nome</span>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="caps text-muted">E-mail</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="caps text-muted">Mensagem</span>
        <textarea name="message" rows={5} required className={fieldClass} />
      </label>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={pending}
          className="caps w-fit rounded-full bg-accent px-6 py-3 text-foreground transition-colors hover:bg-hover disabled:opacity-60"
        >
          {pending ? "Enviando…" : "Enviar mensagem"}
        </button>

        {state.message && (
          <p
            role="status"
            className={`text-small-body ${state.ok ? "text-foreground" : "text-hover"}`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
