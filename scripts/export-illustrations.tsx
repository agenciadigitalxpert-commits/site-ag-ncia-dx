/**
 * Exporta cada ilustração do HeroArt como SVG estático (sem animação),
 * com as cores da marca resolvidas e fundo #0A0A0B. Uso:
 *   npx tsx scripts/export-illustrations.tsx <pasta-de-saída>
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroArt, heroArtKeys } from "../src/components/HeroArt";

const out = process.argv[2] ?? "ilustracoes-svg";
mkdirSync(out, { recursive: true });
for (const key of heroArtKeys) {
  const html = renderToStaticMarkup(<HeroArt variant={key} />);
  let svg = html.slice(html.indexOf("<svg"), html.lastIndexOf("</svg>") + 6);
  svg = svg
    .replace(/var\(--silver-300\)/g, "#EEEEEB")
    .replace(/var\(--grey-950\)/g, "#0A0A0B")
    .replace(/currentColor/g, "#FFFFFF")
    .replace(/ class="[^"]*"/g, "")
    .replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" ')
    .replace(/(<svg[^>]*>)/, '$1<rect width="400" height="400" fill="#0A0A0B"/><circle cx="200" cy="200" r="150" fill="#EEEEEB" fill-opacity="0.06"/>');
  writeFileSync(join(out, `${key}.svg`), svg);
}
console.log(`${heroArtKeys.length} ilustrações exportadas em ${out}`);
