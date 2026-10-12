import type { Metadata } from "next";
import { DispatchForm } from "@/components/forms/DispatchForm";
import { PageHeader } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Price alerts",
  description: "A note when a price on the register changes or a product is withdrawn. Nothing else.",
  alternates: { canonical: "/dispatch" },
};

export default async function DispatchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const confirmed = (await searchParams).confirmed === "1";

  return (
    <>
      <PageHeader title="Price alerts" stamp="The Dispatch newsletter" />
      <div className="mx-auto w-full max-w-[1080px] px-6 pb-12 lg:pb-[72px]">
        <div className="max-w-[520px] border-t border-line-firm pt-10">
          {confirmed && (
            <p role="status" className="mb-8 bg-lime-wash p-4 text-[15px] leading-6">
              Confirmed. You are on the list.
            </p>
          )}
          <h2 className="font-heading text-[20px] leading-7 font-bold">What it is</h2>
          <p className="mt-2 text-[15px] leading-6">
            A plain email from the register. It tells you when a price we track changes, when a product is withdrawn, and when a SARS rule changes a field we record.
          </p>
          <h2 className="mt-8 font-heading text-[20px] leading-7 font-bold">When it sends</h2>
          <p className="mt-2 text-[15px] leading-6">
            Only when one of those happens. There is no schedule. If nothing changes you hear nothing, and we never send marketing for anyone else.
          </p>
          <div className="mt-10 border-t border-line pt-8">
            <DispatchForm interests />
          </div>
        </div>
      </div>
    </>
  );
}
