import { buildMailtoUrl } from "@/lib/mailto";

type ContactCtaProps = {
  email: string;
};

// CTA principal da página de contato — abre o cliente de e-mail do usuário (sem backend).
export function ContactCta({ email }: ContactCtaProps) {
  const href = buildMailtoUrl(email, {
    subject: "Contato pelo portfólio",
    body: "Olá! Gostaria de conversar sobre um projeto.\n\n",
  });

  return (
    <div className="flex flex-col gap-6 rounded-card border border-accent/60 bg-secondary/10 p-8 lg:p-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-small-heading text-foreground">Vamos conversar?</h2>
        <p className="text-large-body text-foreground/90">
          Toque no botão abaixo para abrir seu app de e-mail com uma mensagem pré-preenchida.
        </p>
      </div>

      <a
        href={href}
        className="caps inline-flex w-fit items-center justify-center rounded-full bg-accent px-8 py-4 text-foreground transition-colors hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Enviar e-mail ↗
      </a>

      <p className="text-small-body text-muted">
        Ou escreva diretamente para{" "}
        <span className="text-foreground/80">{email}</span>
      </p>
    </div>
  );
}
