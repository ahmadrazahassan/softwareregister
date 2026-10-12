import "server-only";
import { cache } from "react";
import { FX_SNAPSHOT } from "../data/fx";
import type { FxRates } from "../fx";

const ENDPOINT = "https://api.frankfurter.dev/v1/latest?base=ZAR&symbols=USD,GBP,EUR";

/**
 * Today's reference rates when the feed answers, the saved snapshot when it does not.
 * The page never waits on the feed for more than a few seconds and never breaks without it.
 */
export const getFxRates = cache(async (): Promise<FxRates> => {
  try {
    const res = await fetch(ENDPOINT, { next: { revalidate: 43200 }, signal: AbortSignal.timeout(4000) });
    if (!res.ok) return FX_SNAPSHOT;
    const body = (await res.json()) as { date?: string; rates?: Record<string, number> };
    const { USD, GBP, EUR } = body.rates ?? {};
    if (!body.date || ![USD, GBP, EUR].every((n) => typeof n === "number" && n > 0)) return FX_SNAPSHOT;
    return {
      asOf: body.date,
      source: FX_SNAPSHOT.source,
      live: true,
      perRand: { USD: USD as number, GBP: GBP as number, EUR: EUR as number },
    };
  } catch {
    return FX_SNAPSHOT;
  }
});
