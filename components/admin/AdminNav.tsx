"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Sectors", href: "/admin/sectors" },
  { label: "Comparisons", href: "/admin/comparisons" },
  { label: "Briefings", href: "/admin/briefings" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Dispatch", href: "/admin/dispatch" },
  { label: "Enquiries", href: "/admin/enquiries" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:block lg:overflow-visible">
      {ITEMS.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex h-9 flex-none items-center px-4 text-[14px] font-medium whitespace-nowrap hover:bg-lime-wash lg:px-4 ${active ? "bg-lime-wash" : ""}`}
          >
            {active && <span aria-hidden="true" className="absolute top-0 left-0 hidden h-full w-[2px] bg-lime lg:block" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
