import { leadIntegrationReady } from "@/config/env";
import { site } from "@/config/site";
import { LeadForm } from "./LeadForm";
import { TrackedLink } from "./TrackedLink";
import { ArrowIcon, btn } from "./ui";

export function DiagnosticIntake({ location }: { location: string }) {
  if (leadIntegrationReady) return <LeadForm location={location} />;

  return (
    <div>
      <p className="text-text-secondary">
        O diagnóstico começa pelo formulário oficial da DX. Conte o que você vende e como seus clientes chegam até você.
      </p>
      <TrackedLink
        href={site.contact.diagnosticForm}
        prefetch={false}
        trackLabel="Abrir formulário da DX"
        trackLocation={location}
        className={btn("primary", "mt-6 w-full sm:w-auto")}
      >
        Abrir formulário da DX <ArrowIcon className="-rotate-45" />
      </TrackedLink>
      <p className="mt-5 text-sm leading-5 text-text-secondary">
        Prefere enviar uma mensagem?{" "}
        <a href={site.social.instagram} className="link-u text-text-primary">Fale com a DX no Instagram</a>.
      </p>
    </div>
  );
}
