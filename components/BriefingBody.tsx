import Link from "next/link";
import type { ReactNode } from "react";
import { BANKS } from "@/lib/data/sectors";
import { priceLabel } from "@/lib/format";
import { fillTokens, vatRows, type Registry } from "@/lib/registry";
import type { BriefingBlock, PricedSoftware } from "@/lib/types";
import { CheckedStamp, Note } from "./primitives";

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Renders [label](href) as a link. Anything else is plain text. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    out.push(
      <Link key={i++} href={match[2]} className="prose-link">
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function names(items: PricedSoftware[]): ReactNode {
  return items.map((s, i) => (
    <span key={s.slug}>
      <Link href={`/register/${s.slug}`} className="prose-link">
        {s.name}
      </Link>
      {i < items.length - 1 ? ", " : ""}
    </span>
  ));
}

function Live({ name, reg, tokens }: { name: Extract<BriefingBlock, { type: "live" }>["name"]; reg: Registry; tokens: Record<string, string> }) {
  const all = reg.items;

  switch (name) {
    case "priced": {
      const rows = all.filter((s) => (s.starting_price ?? 0) > 0).sort((a, b) => a.name.localeCompare(b.name, "en-ZA"));
      return (
        <div className="not-prose overflow-x-auto">
          <table className="register">
            <caption className="sr-only">Products with a published price</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col" className="num">From</th>
                <th scope="col">Basis</th>
                <th scope="col">Price read</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => {
                const p = priceLabel(s);
                return (
                  <tr key={s.slug} className="row">
                    <td>
                      <Link href={`/register/${s.slug}`} className="row-link font-semibold">{s.name}</Link>
                    </td>
                    <td className="num font-semibold">{p.amount}</td>
                    <td className="text-[12px] text-muted">{p.basis}</td>
                    <td><CheckedStamp date={s.price_checked_at} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    case "quoted": {
      const rows = all.filter((s) => s.starting_price === null);
      return (
        <p className="mb-5 text-[15px] leading-6">
          Price on request ({rows.length}): {names(rows)}.
        </p>
      );
    }

    case "free": {
      const rows = all.filter((s) => s.starting_price === 0);
      return (
        <div className="overflow-x-auto">
          <table className="register">
            <caption className="sr-only">Products that start free</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Sector</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.slug} className="row">
                  <td><Link href={`/register/${s.slug}`} className="row-link font-semibold">{s.name}</Link></td>
                  <td className="text-muted">{s.sector.replace("-", " ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "vat": {
      const rows = vatRows(all);
      return (
        <div className="overflow-x-auto">
          <table className="register">
            <caption className="sr-only">Rand prices on both VAT footings</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col" className="num">Listed</th>
                <th scope="col">Basis</th>
                <th scope="col" className="num">Including VAT</th>
                <th scope="col" className="num">Excluding VAT</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.software.slug}>
                  <td className="font-semibold">{r.software.name}</td>
                  <td className="num">{r.listed}</td>
                  <td className="text-[12px] text-muted">{r.basis}</td>
                  <td className="num font-semibold">{r.including}</td>
                  <td className="num font-semibold">{r.excluding}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Note className="mt-2 mb-6">Computed at {tokens.vat_pct} percent VAT and rounded to the cent.</Note>
        </div>
      );
    }

    case "banks": {
      return (
        <div className="mb-7 overflow-x-auto">
          <table className="register">
            <caption className="sr-only">Banks the register asks about</caption>
            <thead>
              <tr>
                <th scope="col">Bank</th>
                <th scope="col" className="num">Products feeding</th>
              </tr>
            </thead>
            <tbody>
              {BANKS.map((b) => (
                <tr key={b}>
                  <td className="font-semibold">{b}</td>
                  <td className="num">{all.filter((s) => s.bank_feeds?.includes(b)).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

/**
 * Renders a briefing body. Tokens like {{priced}} are filled from the live
 * dataset, and `live` blocks read straight from it, so a figure in a briefing
 * can never drift from the register.
 */
export function BriefingBody({ blocks, reg, tokens }: { blocks: BriefingBlock[]; reg: Registry; tokens: Record<string, string> }) {
  const fill = (t: string) => fillTokens(t, tokens);
  return (
    <div className="prose-register">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} id={slugifyHeading(block.text)}>
                {fill(block.text)}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{fill(block.text)}</h3>;
          case "p":
            return <p key={i}>{inline(fill(block.text))}</p>;
          case "quote":
            return (
              <blockquote key={i}>
                <p>{inline(fill(block.text))}</p>
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{inline(fill(item))}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{inline(fill(item))}</li>
                ))}
              </ol>
            );
          case "note":
            return (
              <aside key={i} className="my-6 rounded-[16px] border border-lime-deep/30 bg-lime-wash p-5 text-[15px] leading-6">
                {inline(fill(block.text))}
              </aside>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table className="register">
                  <thead>
                    <tr>
                      {block.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c} className={c === 0 ? "font-semibold" : ""}>
                            {inline(fill(cell))}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "live":
            return <Live key={i} name={block.name} reg={reg} tokens={tokens} />;
        }
      })}
    </div>
  );
}
