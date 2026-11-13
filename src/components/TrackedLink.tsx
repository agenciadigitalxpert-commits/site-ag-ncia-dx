"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & { trackLabel: string; trackLocation: string };

/** Link de CTA que registra `cta_click` (sem dados pessoais). */
export function TrackedLink({ trackLabel, trackLocation, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        track("cta_click", { cta_label: trackLabel, cta_location: trackLocation, destination: String(rest.href) });
        onClick?.(e);
      }}
    />
  );
}
