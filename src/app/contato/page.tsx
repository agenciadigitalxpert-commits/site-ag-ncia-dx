import { site } from "@/config/site";
import { leadIntegrationReady, whatsappNumber } from "@/config/env";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { HeroGrid } from "@/components/sections";
import { Container, DevNote } from "@/components/ui";
import { WhatsAppInline } from "@/components/WhatsAppInline";

const TITLE = "Contato e diagnóstico";
const DESC =
  "Solicite um diagnóstico da Agência Digital Xpert. Conte sobre sua empresa e converse com a equipe sobre tráfego pago, atendimento e estrutura comercial.";
const crumbs = [
  { name: "Início", href: "/" },
  { name: "Contato", href: "/contato" },
];

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: "/contato" });

const next = [
  { t: "Você envia o formulário", d: "Com informações básicas sobre a empresa e o principal desafio." },
  { t: "Nossa equipe analisa", d: "Lemos o contexto antes do contato, para a conversa ser objetiva." },
  { t: "Conversamos", d: "Pelo WhatsApp informado, para entender a operação e apresentar o diagnóstico." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode({ path: "/contato", name: TITLE, description: DESC, type: "ContactPage", about: ids.org }), breadcrumbNode("/contato", crumbs))} />
      <section className="surface-dark relative overflow-hidden">
        <HeroGrid />
        <Container className="relative pb-20 pt-10 lg:pb-28 lg:pt-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <p className="hero-rise mb-5 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-accent">Contato</p>
              <h1 className="hero-rise text-h1" style={{ ["--d" as string]: "60ms" }}>Vamos entender a sua operação.</h1>
              <p className="hero-rise text-lead mt-6 text-white/75" style={{ ["--d" as string]: "140ms" }}>
                Preencha o formulário para solicitar um diagnóstico. Quanto mais contexto, mais produtiva será a primeira conversa.
              </p>
              <ol className="mt-12 space-y-6">
                {next.map((n, i) => (
                  <li key={n.t} className="flex gap-5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-dark text-sm tabular-nums text-accent">{i + 1}</span>
                    <div>
                      <p className="font-medium">{n.t}</p>
                      <p className="mt-1 text-[0.95rem] text-muted-dark">{n.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-12 border-t border-line-dark pt-8 text-[0.95rem] text-white/80">
                <p className="font-medium text-white">{site.name}</p>
                <p className="mt-1">{site.location.city} — {site.location.stateName}</p>
                <p className="mt-1 text-muted-dark">Atendimento a empresas de todo o Brasil</p>
                {site.contact.email ? <p className="mt-3"><a className="link-u" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p> : null}
                {site.contact.phone ? <p className="mt-1"><a className="link-u" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a></p> : null}
                {whatsappNumber ? <WhatsAppInline number={whatsappNumber} /> : null}
              </div>
              <DevNote>e-mail, telefone e WhatsApp aparecem automaticamente quando configurados (src/config/site.ts e NEXT_PUBLIC_WHATSAPP_NUMBER).</DevNote>
            </div>
            <div id="diagnostico" className="scroll-mt-28 rounded-3xl border border-line-dark bg-graphite p-6 sm:p-10">
              <h2 className="text-h3 mb-6">Quero um diagnóstico</h2>
              <LeadForm integrationReady={leadIntegrationReady} location="contact_page" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
