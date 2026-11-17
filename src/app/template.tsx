import { ViewTransition } from "react";

/**
 * Cada navegação remonta o template: a página antiga sai (rápido) e a nova
 * entra com mola. O cabeçalho fica ancorado (ver globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
