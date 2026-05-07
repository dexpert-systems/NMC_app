export type NavItem = {
  href: string;
  label: string;
  blurb: string;
  icon: "spark" | "pay" | "map" | "report" | "services" | "projects" | "alerts" | "data" | "community";
};

export const NAV: NavItem[] = [
  {
    href: "/ask",
    label: "Ask NMC",
    blurb: "Civic AI · find services, explain bills, file complaints",
    icon: "spark",
  },
  {
    href: "/property",
    label: "Property tax",
    blurb: "Pay dues · view bills · download receipts",
    icon: "pay",
  },
  {
    href: "/map",
    label: "City map",
    blurb: "GIS · wards · projects · infrastructure",
    icon: "map",
  },
  {
    href: "/report",
    label: "Report an issue",
    blurb: "Photos · voice · geotagged · live tracking",
    icon: "report",
  },
  {
    href: "/services",
    label: "Civic services",
    blurb: "Certificates · licenses · NOCs · permits",
    icon: "services",
  },
  {
    href: "/projects",
    label: "Projects",
    blurb: "Transparency · budgets · ward works · tenders",
    icon: "projects",
  },
  {
    href: "/alerts",
    label: "Alerts",
    blurb: "Weather · water · disaster · advisories",
    icon: "alerts",
  },
  {
    href: "/data",
    label: "Open data",
    blurb: "Live KPIs · revenue · trends · environmental",
    icon: "data",
  },
  {
    href: "/community",
    label: "Community",
    blurb: "Events · polls · campaigns · culture",
    icon: "community",
  },
];

export const HOME_TILE_ORDER = [
  "/property",
  "/report",
  "/services",
  "/map",
  "/projects",
  "/data",
];
