"use client";

export type Role =
  | "commissioner"
  | "cafo"
  | "inspector"
  | "trade-officer"
  | "survey"
  | "revenue";

export type RoleProfile = {
  id: Role;
  name: string;
  shortName: string;
  dept: string;
  initials: string;
  homeHref: string;
  hue: string;
};

export const ROLES: Record<Role, RoleProfile> = {
  commissioner: {
    id: "commissioner",
    name: "Dr. Anita Patil",
    shortName: "Commissioner",
    dept: "Office of the Commissioner",
    initials: "AP",
    homeHref: "/erp",
    hue: "from-accent/30 to-heritage/15",
  },
  cafo: {
    id: "cafo",
    name: "Suresh Bhandari",
    shortName: "Chief Account & Finance Officer",
    dept: "Finance",
    initials: "SB",
    homeHref: "/erp/revenue",
    hue: "from-sage/30 to-heritage/15",
  },
  inspector: {
    id: "inspector",
    name: "Vikram Shinde",
    shortName: "Field Inspector",
    dept: "Public Works · Zone 4",
    initials: "VS",
    homeHref: "/erp/inspections",
    hue: "from-amber/30 to-accent/15",
  },
  "trade-officer": {
    id: "trade-officer",
    name: "Priya Deshmukh",
    shortName: "Trade License Officer",
    dept: "Licensing · Zone 2",
    initials: "PD",
    homeHref: "/erp/approvals",
    hue: "from-heritage/30 to-sage/15",
  },
  survey: {
    id: "survey",
    name: "Rahul Joshi",
    shortName: "Survey Officer",
    dept: "GIS & Property Survey",
    initials: "RJ",
    homeHref: "/erp",
    hue: "from-accent/30 to-amber/15",
  },
  revenue: {
    id: "revenue",
    name: "Meera Kale",
    shortName: "Revenue Officer",
    dept: "Property Tax · Ward 14",
    initials: "MK",
    homeHref: "/erp/revenue",
    hue: "from-sage/30 to-accent/15",
  },
};

const KEY = "nmc-erp-role";

export function getCurrentRole(): Role | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v && (v in ROLES) ? (v as Role) : null;
  } catch {
    return null;
  }
}

export function setCurrentRole(r: Role): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, r);
  } catch {
    /* ignore */
  }
}

export function clearCurrentRole(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
