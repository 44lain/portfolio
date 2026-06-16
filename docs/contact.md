# Contato — Portfólio Lain

A página `/contact` **não usa backend** para envio de mensagens. O fluxo é 100% client-side via `mailto:`.

## Fluxo do usuário

```
/contact
  ├── CopyEmailButton — copia o e-mail para a área de transferência
  └── ContactCta — botão "Enviar e-mail" abre o app de e-mail padrão
```

## Componentes

| Arquivo | Tipo | Função |
|---------|------|--------|
| `src/app/(site)/contact/page.tsx` | Server | Layout da página; lê `site.email` de `site.json` |
| `src/components/sections/ContactCta.tsx` | Server | Botão CTA com `mailto:` pré-preenchido |
| `src/components/ui/CopyEmailButton.tsx` | Client | Copiar e-mail com feedback visual |
| `src/lib/mailto.ts` | Lib | `buildMailtoUrl()` — monta query `subject` e `body` |

## Fonte do e-mail

O endereço vem de `content/site.json`:

```json
{
  "email": "lain.fork@gmail.com"
}
```

Alterar o e-mail no site = editar esse campo (não há variável de ambiente).

## URL mailto gerada

Exemplo:

```
mailto:lain.fork@gmail.com?subject=Contato%20pelo%20portfólio&body=Olá!%20...
```

## Por que não há formulário server-side?

- Zero dependências de SMTP/API (Nodemailer, Resend, n8n)
- Sem secrets em produção
- Funciona em qualquer host estático ou Vercel
- O usuário envia pelo próprio cliente de e-mail (Gmail, Outlook, etc.)

## Evolução futura (opcional)

Se precisar de formulário com backend depois:

1. Server Action + webhook n8n, ou
2. Serviço transacional (Resend, etc.)

O padrão atual prioriza simplicidade e manutenção zero.
