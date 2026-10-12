import type { Metadata } from "next";
import { UnsubscribeForm } from "@/components/forms/UnsubscribeForm";
import { PageHeader } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Unsubscribe from The Dispatch",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const raw = (await searchParams).token;
  const token = (Array.isArray(raw) ? raw[0] : raw) ?? "";

  return (
    <>
      <PageHeader title="Unsubscribe" stamp="The Dispatch">
        {token ? "Press the button and we remove your address. You will not hear from us again." : "Enter the address you subscribed with and we remove it. You will not hear from us again."}
      </PageHeader>
      <div className="mx-auto w-full max-w-[1080px] px-6 pb-12 lg:pb-[72px]">
        <div className="max-w-[520px] border-t border-line-firm pt-8">
          <UnsubscribeForm token={token.slice(0, 100)} />
        </div>
      </div>
    </>
  );
}
