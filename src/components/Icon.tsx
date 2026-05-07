"use client";

type IconName =
  | "spark"
  | "pay"
  | "map"
  | "report"
  | "services"
  | "projects"
  | "alerts"
  | "data"
  | "community"
  | "search"
  | "arrow"
  | "shield"
  | "lock"
  | "close"
  | "back"
  | "voice"
  | "send"
  | "chevron"
  | "check";

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };
  switch (name) {
    case "spark":
      return (
        <svg {...props}>
          <path
            d="M12 2 L13.8 9 L21 12 L13.8 15 L12 22 L10.2 15 L3 12 L10.2 9 Z"
            fill="currentColor"
          />
        </svg>
      );
    case "pay":
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "map":
      return (
        <svg {...props}>
          <path
            d="M9 4 L3 6 v14 l6-2 6 2 6-2 V4 l-6 2 -6-2z M9 4 v14 M15 6 v14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "report":
      return (
        <svg {...props}>
          <path
            d="M12 2 C7 2 3 5.5 3 10 c0 5 9 12 9 12 s9-7 9-12 C21 5.5 17 2 12 2 z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M12 7v4M12 14v0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "services":
      return (
        <svg {...props}>
          <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 6 V4 a2 2 0 0 1 2-2 h2 a2 2 0 0 1 2 2 v2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "projects":
      return (
        <svg {...props}>
          <rect x="3" y="10" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.6" />
          <rect x="10" y="6" width="4" height="15" rx="1" stroke="currentColor" strokeWidth="1.6" />
          <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "alerts":
      return (
        <svg {...props}>
          <path
            d="M6 9 a6 6 0 0 1 12 0 c0 5 2 6 2 6 H4 s2-1 2-6z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M10 19 a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "data":
      return (
        <svg {...props}>
          <path
            d="M3 17 L9 11 L13 15 L21 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M16 6h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "community":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 20 c0-4 3-6 6-6 s6 2 6 6 M14 20 c0-3 2-5 4-5 s3 1.5 3 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...props}>
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chevron":
      return (
        <svg {...props}>
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path
            d="M12 2 4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "close":
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "back":
      return (
        <svg {...props}>
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "voice":
      return (
        <svg {...props}>
          <rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "send":
      return (
        <svg {...props}>
          <path
            d="M3 12 L21 4 L13 21 L11 13 L3 12 z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path
            d="M5 12l5 5L20 7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
