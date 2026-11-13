import Link from "next/link";
import { hasOptionalTracking, tracking } from "@/config/env";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { LegalPage } from "@/components/LegalPage";
import { DataTable } from "@/components/sections";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferencesButton";

const TITLE = "Política de cookies";
const DESC = "Quais cookies e tecnologias semelhantes o site da Agência Digital Xpert usa, para que servem e como você pode aceitar, recusar ou mudar suas preferências.";
const PATH = "/politica-de-cookies";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

export default function CookiesPage() {
  const rows: string[][] = [
    ["dx-attribution (sessionStorage)", "Necessário", "Guarda a origem da visita (UTM e página de entrada) para associar à solicitação enviada pelo formulário. Sem dados pessoais.", "Até fechar a aba"],
  ];
  if (hasOptionalTracking) {
    rows.unshift(["dx-consent (localStorage)", "Necessário", "Registra as suas escolhas de cookies.", "Até ser apagado ou alterado"]);
  }
  if (tracking.gtmId || tracking.ga4Id) {
    rows.push(["_ga, _ga_* (Google Analytics)", "Medição de audiência", "Estatísticas de uso do site, como páginas visitadas e origem do tráfego.", "Até 2 anos"]);
  }
  if (tracking.gtmId) {
    rows.push(["_gcl_* (Google Ads)", "Publicidade", "Medição de conversões de campanhas do Google Ads.", "Até 90 dias"]);
  }
  if (tracking.gtmId || tracking.metaPixelId) {
    rows.push(["_fbp (Meta Pixel)", "Publicidade", "Medição de campanhas e formação de públicos no Facebook e Instagram.", "Até 90 dias"]);
  }

  return (
    <>
      <JsonLd data={graph(webPageNode({ path: PATH, name: TITLE, description: DESC }), breadcrumbNode(PATH, [{ name: "Início", href: "/" }, { name: TITLE, href: PATH }]))} />
      <LegalPage title={TITLE} path={PATH} lead="O que são cookies, quais usamos e como você controla as suas preferências.">
        <h2>O que são cookies</h2>
        <p>Cookies e tecnologias semelhantes (como o armazenamento local do navegador) são pequenos registros que o site grava no seu dispositivo para funcionar, lembrar escolhas ou medir o uso.</p>

        <h2>Categorias</h2>
        <ul>
          <li><strong>Necessários:</strong> indispensáveis para o funcionamento e a segurança do site. Não dependem de consentimento.</li>
          <li><strong>Medição de audiência:</strong> ajudam a entender como o site é usado, de forma estatística. Só são ativados com o seu consentimento.</li>
          <li><strong>Publicidade:</strong> permitem medir resultados de campanhas e formar públicos de anúncios. Só são ativados com o seu consentimento.</li>
        </ul>

        <h2>O que usamos hoje</h2>
        {!hasOptionalTracking ? (
          <p>No momento, o site <strong>não utiliza</strong> cookies de medição de audiência nem de publicidade. Por isso, não exibimos aviso de consentimento. Se isso mudar, esta página será atualizada e você poderá escolher o que aceitar antes de qualquer ferramenta opcional ser carregada.</p>
        ) : (
          <p>Ferramentas opcionais só são carregadas depois da sua escolha no aviso de cookies. Se você recusar, elas não são ativadas.</p>
        )}
        <DataTable caption="Cookies e armazenamentos utilizados pelo site" columns={["Nome", "Categoria", "Finalidade", "Duração"]} rows={rows} />

        <h2>Como gerenciar</h2>
        {hasOptionalTracking ? (
          <p>Você pode rever suas escolhas a qualquer momento: <CookiePreferencesButton className="underline underline-offset-2" />. Também é possível apagar cookies nas configurações do seu navegador.</p>
        ) : (
          <p>Você pode apagar ou bloquear cookies nas configurações do seu navegador. Isso não impede o uso do site.</p>
        )}
        <p>Para saber como tratamos dados pessoais, veja a <Link href="/politica-de-privacidade">política de privacidade</Link>.</p>
      </LegalPage>
    </>
  );
}
