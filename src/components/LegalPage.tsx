import type { ReactNode } from "react";
import { site } from "@/config/site";
import { formatDate } from "@/lib/content";
import { PageHero } from "./sections";
import { Container, Section } from "./ui";

export function LegalPage({ title, path, lead, children }: { title: string; path: string; lead: string; children: ReactNode }) {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Início", href: "/" }, { name: title, href: path }]}
        title={title}
        lead={lead}
        ctaLocation="legal_hero"
        secondary={null}
      />
      <Section tone="light">
        <Container narrow>
          {!site.policiesValidated ? (
            <p role="note" className="mb-10 rounded-xl border border-dashed border-amber-600 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
              <strong>Minuta em validação.</strong> Este texto descreve a operação prevista do site e será revisado antes da versão definitiva.
            </p>
          ) : null}
          <p className="text-sm text-muted-light">Última atualização: {formatDate(site.policiesUpdatedAt)}</p>
          <div className="prose-dx mt-8">{children}</div>
        </Container>
      </Section>
    </>
  );
}
