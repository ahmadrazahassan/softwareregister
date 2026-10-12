"use client";

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ctaClass, type CtaVariant } from "./CtaButton";

interface Props {
  /** Product slug, or an ad creative id. Used only to count clicks. */
  slug: string;
  href: string;
  /** True when the link earns a commission. Adds rel="sponsored". */
  affiliate: boolean;
  placement: string;
  variant?: CtaVariant;
  className?: string;
  children: ReactNode;
}

/**
 * The outbound button. It is a plain link, so it works with scripts off. On
 * click it also posts a beacon to /api/track-click, which stores the product,
 * the placement and a salted hash of the visitor's address, never the address.
 */
export function AffiliateCTAButton({ slug, href, affiliate, placement, variant = "primary", className, children }: Props) {
  const onClick = () => {
    try {
      const body = JSON.stringify({ slug, placement, affiliate });
      if (navigator.sendBeacon) navigator.sendBeacon("/api/track-click", new Blob([body], { type: "application/json" }));
    } catch {
      // Tracking must never block a visitor from leaving.
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel={affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
      onClick={onClick}
      className={ctaClass(variant, className)}
    >
      {children}
      <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}
