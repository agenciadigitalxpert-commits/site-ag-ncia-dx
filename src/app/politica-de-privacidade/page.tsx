import Link from "next/link";
import { site } from "@/config/site";
import { hasOptionalTracking } from "@/config/env";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { LegalPage } from "@/components/LegalPage";

const TITLE = "Política de privacidade";
const DESC = "Como a Agência Digital Xpert coleta, usa, armazena e protege os dados pessoais enviados pelo site, e como exercer seus direitos previstos na LGPD.";
const PATH = "/politica-de-privacidade";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

export default function PrivacyPage() {
  const controller = site.legal.legalName ? `${site.legal.legalName}${site.legal.cnpj ? `, inscrita no CNPJ ${site.legal.cnpj}` : ""}` : site.name;
  const contact = site.legal.privacyContact ?? site.contact.email;
  return (
    <>
      <JsonLd data={graph(webPageNode({ path: PATH, name: TITLE, description: DESC }), breadcrumbNode(PATH, [{ name: "Início", href: "/" }, { name: TITLE, href: PATH }]))} />
      <LegalPage title={TITLE} path={PATH} lead="Transparência sobre os dados que você nos envia e como eles são tratados, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).">
        <h2>1. Quem é o controlador</h2>
        <p>
          O controlador dos dados tratados por meio deste site é {controller}, com sede em {site.location.city} ({site.location.state}).
          {contact ? <> Para assuntos de privacidade, entre em contato pelo e-mail <a href={`mailto:${contact}`}>{contact}</a>.</> : <> O canal de contato para assuntos de privacidade será informado nesta página.</>}
        </p>

        <h2>2. Quais dados coletamos</h2>
        <h3>Dados que você informa</h3>
        <p>Ao preencher o formulário de diagnóstico, coletamos:</p>
        <ul>
          <li>nome, empresa e número de WhatsApp;</li>
          <li>segmento de atuação e principal desafio;</li>
          <li>de forma opcional: se já investe em anúncios, faixa de investimento mensal em mídia, site ou Instagram e outras informações que você decidir compartilhar.</li>
        </ul>
        <p>Pedimos que não envie dados sensíveis (como informações de saúde) no campo de texto livre.</p>
        <h3>Dados coletados automaticamente</h3>
        <ul>
          <li>dados técnicos de acesso necessários para o funcionamento e a segurança do site, como endereço IP, tipo de navegador e páginas acessadas, registrados pelos servidores de hospedagem;</li>
          <li>origem da visita (parâmetros UTM da campanha, página de entrada e site de referência), associada à solicitação enviada pelo formulário para sabermos qual canal gerou o contato;</li>
          {hasOptionalTracking ? (
            <li>dados de navegação por meio de cookies de medição e publicidade, somente se você consentir. Veja a <Link href="/politica-de-cookies">política de cookies</Link>.</li>
          ) : (
            <li>atualmente, o site não utiliza cookies de medição de audiência ou de publicidade. Veja a <Link href="/politica-de-cookies">política de cookies</Link>.</li>
          )}
        </ul>

        <h2>3. Para que usamos os dados</h2>
        <ul>
          <li><strong>Responder à sua solicitação de diagnóstico</strong> e conduzir a conversa comercial que você iniciou (procedimentos preliminares relacionados a contrato, art. 7º, V, da LGPD).</li>
          <li><strong>Organizar o atendimento</strong> em nosso sistema de gestão de clientes (CRM), para que a sua solicitação não se perca (legítimo interesse, art. 7º, IX).</li>
          <li><strong>Entender quais canais geram contatos</strong>, usando dados de origem da visita de forma agregada (legítimo interesse).</li>
          <li><strong>Medir audiência e campanhas</strong>, quando houver cookies opcionais, apenas com o seu consentimento (art. 7º, I).</li>
          <li><strong>Cumprir obrigações legais</strong> e exercer direitos em processos, quando aplicável.</li>
        </ul>
        <p>Não vendemos dados pessoais e não usamos os dados do formulário para finalidades incompatíveis com as descritas aqui.</p>

        <h2>4. Com quem compartilhamos</h2>
        <p>Os dados podem ser tratados por fornecedores que nos ajudam a operar o site e o atendimento, sempre na medida necessária:</p>
        <ul>
          <li>provedor de hospedagem do site;</li>
          <li>ferramenta de CRM, automação ou integração que recebe as solicitações do formulário;</li>
          <li>ferramentas de comunicação usadas para o contato, como o WhatsApp;</li>
          {hasOptionalTracking ? <li>ferramentas de medição e publicidade, conforme as escolhas feitas no aviso de cookies.</li> : null}
        </ul>
        <p>Alguns desses fornecedores podem armazenar dados fora do Brasil. Nesses casos, buscamos fornecedores que adotem salvaguardas compatíveis com a LGPD.</p>

        <h2>5. Por quanto tempo guardamos</h2>
        <p>
          Mantemos os dados da solicitação pelo tempo necessário para o atendimento e o relacionamento comercial. Se não houver continuidade, os dados são eliminados ou anonimizados em prazo razoável, exceto quando a guarda for exigida por lei ou necessária para o exercício de direitos.
        </p>

        <h2>6. Seus direitos</h2>
        <p>Você pode solicitar, a qualquer momento:</p>
        <ul>
          <li>confirmação da existência de tratamento e acesso aos dados;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
          <li>portabilidade, informações sobre compartilhamento e revogação do consentimento, quando essa for a base legal;</li>
          <li>oposição a tratamentos realizados com base em legítimo interesse.</li>
        </ul>
        <p>{contact ? <>Para exercer seus direitos, escreva para <a href={`mailto:${contact}`}>{contact}</a>.</> : <>O canal para exercer seus direitos será informado nesta página.</>} Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).</p>

        <h2>7. Segurança</h2>
        <p>Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados, como conexão criptografada (HTTPS), controle de acesso às ferramentas e envio das solicitações diretamente ao sistema de atendimento.</p>

        <h2>8. Alterações</h2>
        <p>Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última atualização aparece no topo da página.</p>
      </LegalPage>
    </>
  );
}
