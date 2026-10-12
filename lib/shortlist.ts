"use client";

import { useSyncExternalStore } from "react";

/**
 * The shortlist lives in the reader's own browser. Nothing is sent to us, no
 * account is made and nothing is counted. A shortlist can be shared as a link,
 * because the shortlist page carries the products in its address.
 */
const KEY = "softwareregister-shortlist";
const EVENT = "softwareregister:shortlist";
export const SHORTLIST_MAX = 8;

function read(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

export function parseShortlist(raw: string): string[] {
  return [...new Set(raw.split(",").map((s) => s.trim()).filter(Boolean))].slice(0, SHORTLIST_MAX);
}

export function writeShortlist(slugs: string[]): void {
  try {
    window.localStorage.setItem(KEY, [...new Set(slugs)].slice(0, SHORTLIST_MAX).join(","));
  } catch {
    // A browser that blocks storage simply keeps no shortlist.
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The saved slugs, empty on the server and until the browser answers. */
export function useShortlist(): string[] {
  const raw = useSyncExternalStore(subscribe, read, () => "");
  return parseShortlist(raw);
}
