import type { ProductProfile, ProfileSection } from "../../types";
import { PROFILE_SECTIONS } from "./sections";
import { SAGE_PROFILES } from "./sage";
import { ACCOUNTING_PROFILES } from "./accounting";
import { CRM_PROFILES } from "./crm";
import { ERP_PROFILES } from "./erp";
import { PEOPLE_PROFILES } from "./people";
import { PM_PROFILES } from "./pm";

/**
 * The in depth review of each product: the words, the extra figures behind the
 * charts, the FAQs and the sources. Prices, plans and charts come from the live
 * record, so a profile never repeats them. A product with no profile still gets
 * a review page built from its record.
 */
const ALL: ProductProfile[] = [...SAGE_PROFILES, ...ACCOUNTING_PROFILES, ...CRM_PROFILES, ...ERP_PROFILES, ...PEOPLE_PROFILES, ...PM_PROFILES];

const BY_SLUG = new Map(ALL.map((p) => [p.slug, p]));

export function getProfile(slug: string): ProductProfile | undefined {
  return BY_SLUG.get(slug);
}

export function allProfiles(): ProductProfile[] {
  return ALL;
}

/** The sections shown on a review: the profile's own when it has them, else the reused long form text plus any extras. */
export function profileSections(slug: string, profile: ProductProfile | undefined): ProfileSection[] {
  if (profile?.sections && profile.sections.length) return profile.sections;
  return [...(PROFILE_SECTIONS[slug] ?? []), ...(profile?.moreSections ?? [])];
}
