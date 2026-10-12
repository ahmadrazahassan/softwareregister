"use client";

import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { AffiliateCTAButton } from "@/components/AffiliateCTAButton";
import { AreaChart, type AreaSeries } from "@/components/charts/AreaChart";
import { Donut, type DonutPart } from "@/components/charts/Donut";
import type { CalcConfig } from "@/lib/calc";
import { formatRand } from "@/lib/format";

const VAT = 0.15;
const money = (n: number) => formatRand(Math.round(n * 100) / 100);
const whole = (n: number) => formatRand(Math.round(n));

/** Team sizes the growth chart reads, and the months the cost over time chart reads. Kept here so the page needs no server code. */
const SEAT_SIZES = [1, 5, 10, 15, 20, 25, 30, 40, 50];
const BAND_SIZES = [2, 5, 10, 20, 30, 50, 75, 100, 150, 200];
const MONTHS = [0, 6, 12, 18, 24, 30, 36];

interface Bill {
  monthly: number;
  label: string;
  vat: "incl" | "excl" | "unstated";
  lines: { name: string; amount: number }[];
  /** False when the vendor does not sell the chosen plan at this size. */
  sold: boolean;
}

/** One month's bill for a plan, a team size, a way of paying and a set of extras. Pure, so the charts can ask it about other sizes. */
function billFor(config: CalcConfig, planIdx: number, seats: number, yearly: boolean, picked: Record<string, number>): Bill {
  if (config.mode === "bands") {
    const open = config.bands.find((b) => b.upTo === null);
    const band = config.bands.find((b) => b.upTo !== null && seats <= (b.upTo as number));
    const total = band ? (band.monthly as number) : open && open.perEmployee ? open.perEmployee * seats : 0;
    return { monthly: total, label: band ? band.label : open ? open.label : "", vat: "incl", lines: [], sold: true };
  }
  const plan = config.plans[planIdx];
  if (!plan) return { monthly: 0, label: "", vat: "unstated", lines: [], sold: true };
  const flat = plan.seatPriced && plan.flatUpTo !== null && plan.flatMonthly !== null && seats <= plan.flatUpTo;
  const base = flat ? (plan.flatMonthly as number) : (yearly ? plan.yearly : plan.monthly) * (plan.seatPriced ? seats : 1);
  const lines = [{ name: flat ? `${plan.name}, flat rate for up to ${plan.flatUpTo}` : plan.name + (plan.seatPriced ? ` × ${seats}` : ""), amount: base }];
  for (const a of config.addOns) {
    const qty = picked[a.id];
    if (!qty) continue;
    const unit = yearly ? a.yearly : a.monthly;
    const amount = a.kind === "flat" ? unit : a.kind === "seat" ? unit * seats : unit * qty;
    lines.push({ name: a.name + (a.kind === "count" ? ` × ${qty}` : a.kind === "seat" ? ` × ${seats}` : ""), amount });
  }
  const sold = flat || ((plan.min === null || seats >= plan.min) && (plan.max === null || seats <= plan.max));
  return { monthly: lines.reduce((t, l) => t + l.amount, 0), label: plan.name, vat: plan.vat, lines, sold };
}

/** What the reader would pay, with VAT in where the vendor states its basis. */
const shown = (b: Bill) => (b.vat === "excl" ? b.monthly * (1 + VAT) : b.monthly);

export interface CalculatorCta {
  slug: string;
  href: string;
  affiliate: boolean;
  vendor: string;
  disclosure: string;
}

function Stepper({ id, label, value, min, max, onChange }: { id: string; label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  // While the reader types, the field may be empty. It snaps back to the number in use when they leave it.
  const [draft, setDraft] = useState<string | null>(null);
  const set = (n: number) => onChange(Math.min(max, Math.max(min, Math.round(n) || min)));
  const step = (n: number) => {
    setDraft(null);
    set(n);
  };
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] leading-5 font-semibold">
        {label}
      </label>
      <div className="inline-flex items-center rounded-[10px] border border-line-firm bg-surface">
        <button type="button" onClick={() => step(value - 1)} aria-label={`One fewer, ${label}`} className="inline-flex h-11 w-11 cursor-pointer items-center justify-center hover:bg-lime-wash">
          <Minus size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={draft ?? value}
          onChange={(e) => {
            setDraft(e.target.value);
            if (e.target.value !== "" && Number.isFinite(Number(e.target.value))) set(Number(e.target.value));
          }}
          onBlur={() => setDraft(null)}
          className="h-11 w-20 border-x border-line-firm bg-transparent text-center text-[16px] font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button type="button" onClick={() => step(value + 1)} aria-label={`One more, ${label}`} className="inline-flex h-11 w-11 cursor-pointer items-center justify-center hover:bg-lime-wash">
          <Plus size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/**
 * Add up your own bill. It takes the plan, the number of users or employees, the
 * extras and the way you pay, and shows the month and the year with VAT in and
 * out where the vendor states its basis. Every price in it is the vendor's, in
 * rand: it adds, it does not estimate. Nothing is sent anywhere.
 */
export function CostCalculator({ config, cta }: { config: CalcConfig; cta?: CalculatorCta }) {
  const [planIdx, setPlanIdx] = useState(Math.max(0, config.plans.findIndex((p) => p.monthly > 0)));
  const [seats, setSeats] = useState(config.defaultSeats);
  const [yearly, setYearly] = useState(false);
  const [picked, setPicked] = useState<Record<string, number>>({});

  const result = useMemo(() => billFor(config, planIdx, seats, yearly, picked), [config, planIdx, seats, yearly, picked]);

  const incl = result.vat === "incl" ? result.monthly : result.vat === "excl" ? result.monthly * (1 + VAT) : null;
  const excl = result.vat === "excl" ? result.monthly : result.vat === "incl" ? result.monthly / (1 + VAT) : null;
  const plan = config.plans[planIdx];
  const sizeNote = !plan
    ? null
    : plan.min !== null && seats < plan.min && !(plan.flatUpTo !== null && seats <= plan.flatUpTo)
      ? `${plan.name} is sold for ${plan.min} or more ${config.seatLabel.toLowerCase()}.`
      : plan.max !== null && seats > plan.max
        ? `${plan.name} is sold for up to ${plan.max} ${config.seatLabel.toLowerCase()}.`
        : null;
  const showSeats = config.mode === "bands" || Boolean(plan?.seatPriced) || config.addOns.some((a) => a.kind === "seat");

  /* ---- the charts under the calculator, all worked out from the same bill ---- */
  const growth = useMemo<AreaSeries[]>(() => {
    if (!(config.mode === "bands" || plan?.seatPriced || config.addOns.some((a) => a.kind === "seat"))) return [];
    const sizes = config.mode === "bands" ? BAND_SIZES : SEAT_SIZES;
    const points = sizes
      .map((n) => ({ n, b: billFor(config, planIdx, n, yearly, picked) }))
      .filter((p) => p.b.sold)
      .map((p) => ({ x: p.n, y: shown(p.b) }));
    return points.length > 1 ? [{ name: "Your bill a month", points, tone: "azure" as const }] : [];
  }, [config, planIdx, yearly, picked, plan]);

  const overTime = useMemo<AreaSeries[]>(() => {
    if (config.mode !== "plans" || !config.hasYearly) return [];
    const m = billFor(config, planIdx, seats, false, picked);
    const y = billFor(config, planIdx, seats, true, picked);
    if (!m.sold || shown(y) >= shown(m)) return [];
    return [
      { name: "Paying monthly", points: MONTHS.map((n) => ({ x: n, y: shown(m) * n })), tone: "ink" as const },
      { name: "Paying for a year", points: MONTHS.map((n) => ({ x: n, y: shown(y) * n })), tone: "lime" as const },
    ];
  }, [config, planIdx, seats, picked]);
  const threeYearSaving = overTime.length === 2 ? overTime[0].points[overTime[0].points.length - 1].y - overTime[1].points[overTime[1].points.length - 1].y : 0;

  const parts = useMemo<DonutPart[]>(() => {
    if (result.monthly <= 0) return [];
    const factor = result.vat === "excl" ? 1 : result.vat === "incl" ? 1 / (1 + VAT) : 1;
    const planPart = (result.lines[0]?.amount ?? result.monthly) * factor;
    const extras = result.lines.slice(1).reduce((s, l) => s + l.amount, 0) * factor;
    const vatPart = result.vat === "unstated" ? 0 : (incl as number) - (excl as number);
    return [
      { label: config.mode === "bands" ? "Payroll, excluding VAT" : result.vat === "unstated" ? "Plan" : "Plan, excluding VAT", value: planPart, display: money(planPart), tone: "ink" as const },
      ...(extras > 0 ? [{ label: "Extras", value: extras, display: money(extras), tone: "azure" as const }] : []),
      ...(vatPart > 0 ? [{ label: "VAT at 15 percent", value: vatPart, display: money(vatPart), tone: "lime" as const }] : []),
    ];
  }, [result, config.mode, incl, excl]);

  return (
    <div className="rounded-[24px] border border-line-firm bg-surface p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col gap-6">
          {config.mode === "plans" && config.plans.length > 1 && (
            <fieldset className="m-0 border-0 p-0">
              <legend className="mb-2 text-[14px] leading-5 font-semibold">Plan</legend>
              <div className="flex flex-wrap gap-2">
                {config.plans.map((p, i) => (
                  <button
                    key={p.name}
                    type="button"
                    aria-pressed={i === planIdx}
                    onClick={() => setPlanIdx(i)}
                    className={`min-h-10 cursor-pointer rounded-full border px-4 text-[14px] leading-5 font-medium ${i === planIdx ? "border-lime bg-lime font-semibold text-lime-ink" : "border-line-firm bg-surface hover:bg-lime-wash"}`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              {plan?.note && <p className="mt-2 text-[13px] leading-5 text-muted">{plan.note}</p>}
            </fieldset>
          )}

          {showSeats && <Stepper id="calc-seats" label={config.seatLabel} value={seats} min={1} max={5000} onChange={setSeats} />}
          {config.mode === "plans" && plan?.seatPriced && sizeNote && <p className="-mt-3 text-[13px] leading-5 text-muted">{sizeNote}</p>}

          {config.mode === "plans" && config.addOns.length > 0 && (
            <fieldset className="m-0 border-0 p-0">
              <legend className="mb-2 text-[14px] leading-5 font-semibold">Extras</legend>
              <ul className="space-y-2">
                {config.addOns.map((a) => {
                  const on = Boolean(picked[a.id]);
                  return (
                    <li key={a.id} className="flex items-center justify-between gap-3 rounded-[12px] border border-line px-3 py-2.5">
                      <label className="flex min-w-0 cursor-pointer items-center gap-3 text-[14px] leading-5">
                        <input
                          type="checkbox"
                          className="check"
                          checked={on}
                          onChange={(e) => setPicked((p) => ({ ...p, [a.id]: e.target.checked ? 1 : 0 }))}
                        />
                        <span className="min-w-0">
                          <span className="block font-medium">{a.name}</span>
                          <span className="block text-[12px] text-muted">
                            {money(yearly ? a.yearly : a.monthly)}
                            {a.kind === "seat" ? " per head" : a.kind === "count" ? ` each${a.countLabel ? `, ${a.countLabel}` : ""}` : ""} a month
                          </span>
                        </span>
                      </label>
                      {a.kind === "count" && on && (
                        <span className="flex flex-none items-center gap-2">
                          <label htmlFor={`qty-${a.id}`} className="sr-only">
                            How many, {a.name}
                          </label>
                          <input
                            id={`qty-${a.id}`}
                            type="number"
                            min={1}
                            max={500}
                            value={picked[a.id]}
                            onChange={(e) => setPicked((p) => ({ ...p, [a.id]: Math.max(1, Math.min(500, Math.round(Number(e.target.value)) || 1)) }))}
                            className="h-9 w-16 rounded-[8px] border border-line-firm bg-paper text-center text-[14px] font-semibold"
                          />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          )}

          {config.mode === "plans" && config.hasYearly && (
            <fieldset className="m-0 border-0 p-0">
              <legend className="mb-2 text-[14px] leading-5 font-semibold">How you pay</legend>
              <div className="inline-flex rounded-full border border-line-firm p-1">
                {[
                  { v: false, l: "Monthly" },
                  { v: true, l: "Yearly" },
                ].map((o) => (
                  <button
                    key={o.l}
                    type="button"
                    aria-pressed={yearly === o.v}
                    onClick={() => setYearly(o.v)}
                    className={`min-h-9 cursor-pointer rounded-full px-5 text-[14px] leading-5 font-medium ${yearly === o.v ? "bg-lime font-semibold text-lime-ink" : "hover:bg-lime-wash"}`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        </div>

        <div aria-live="polite" className="self-start rounded-[20px] bg-lime-wash p-6">
          <p className="stamp text-muted">{config.mode === "bands" ? `Band: ${result.label} employees` : "Your bill"}</p>
          <p className="mt-2 font-heading text-[48px] leading-[50px] font-bold tracking-[-0.03em]">{money(incl ?? result.monthly)}</p>
          <p className="text-[14px] leading-5 text-muted">
            a month{incl !== null ? " including VAT" : ", as the vendor lists it"}
          </p>

          <dl className="mt-5 space-y-2 border-t border-line-firm pt-4 text-[14px] leading-5">
            {excl !== null && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Excluding VAT</dt>
                <dd className="m-0 font-semibold">{money(excl)} a month</dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="text-muted">A year{incl !== null ? ", including VAT" : ""}</dt>
              <dd className="m-0 font-semibold">{money((incl ?? result.monthly) * 12)}</dd>
            </div>
            {excl !== null && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">A year, excluding VAT</dt>
                <dd className="m-0 font-semibold">{money(excl * 12)}</dd>
              </div>
            )}
            {config.mode === "bands" && seats > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Per employee</dt>
                <dd className="m-0 font-semibold">{money(result.monthly / seats)} a month</dd>
              </div>
            )}
          </dl>

          {result.lines.length > 1 && (
            <ul className="mt-4 space-y-1 border-t border-line-firm pt-3 text-[13px] leading-5 text-muted">
              {result.lines.map((l) => (
                <li key={l.name} className="flex justify-between gap-4">
                  <span>{l.name}</span>
                  <span>{money(l.amount)}</span>
                </li>
              ))}
            </ul>
          )}
          {result.vat === "unstated" && config.mode === "plans" && (
            <p className="mt-4 text-[12px] leading-4 text-muted">The vendor does not say whether VAT is in its price, so none is added or taken out.</p>
          )}
          {cta && (
            <div className="mt-5 border-t border-line-firm pt-5">
              <AffiliateCTAButton slug={cta.slug} href={cta.href} affiliate={cta.affiliate} placement="review-calculator" variant="primary" className="w-full">
                {result.monthly === 0 ? `Start free at ${cta.vendor}` : config.mode === "bands" ? `Buy this band at ${cta.vendor}` : `Get ${result.label} at ${cta.vendor}`}
              </AffiliateCTAButton>
              {cta.affiliate && <p className="mt-2 text-[12px] leading-4 text-muted">{cta.disclosure}</p>}
            </div>
          )}
        </div>
      </div>

      {(growth.length > 0 || overTime.length > 0 || parts.length > 1) && (
        <div className="mt-10 space-y-5 border-t border-line pt-8">
          {parts.length > 1 && (
            <div className="rounded-[20px] border border-line p-5">
              <Donut parts={parts} centre={money(incl ?? result.monthly)} centreNote={incl !== null ? "a month including VAT" : "a month"} caption="Where this month's bill goes" />
            </div>
          )}
          {growth.length > 0 && (
            <div className="rounded-[20px] border border-line p-5">
              <AreaChart
                series={growth}
                caption={`Your bill as the team grows`}
                xTicks={config.mode === "bands" ? [2, 50, 100, 150, 200] : [1, 10, 20, 30, 40, 50]}
                xFormat={(n) => String(n)}
                yFormat={whole}
                xHeading={config.seatLabel}
                marker={seats >= growth[0].points[0].x && seats <= growth[0].points[growth[0].points.length - 1].x ? { x: seats, label: `You: ${seats}` } : undefined}
                note={config.mode === "bands" ? "Each step is a band. Including VAT." : "The plan and extras you chose, at each team size. A plan is left out at a size the vendor does not sell it for."}
              />
            </div>
          )}
          {overTime.length > 0 && (
            <div className="rounded-[20px] border border-line p-5">
              <AreaChart
                series={overTime}
                caption="What you have paid after three years, monthly against yearly"
                xTicks={MONTHS}
                xFormat={(n) => (n === 0 ? "Start" : n % 12 === 0 ? `Year ${n / 12}` : `${n} months`)}
                yFormat={whole}
                xHeading="Time"
                note={threeYearSaving > 0 ? `Paying for a year instead of monthly saves about ${whole(threeYearSaving)} over three years at the team size and extras above.` : undefined}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
