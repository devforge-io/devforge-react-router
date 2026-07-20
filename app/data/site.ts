export const SITE = {
  company: "Devforge Pty Ltd",
  name: "Devforge",
  domain: "devforge.io",
  url: "https://devforge.io",
  email: "hello@devforge.io",
  tagline: "Developer infrastructure you own.",
  description:
    "Devforge builds self-hostable developer infrastructure — a graph database, an egress proxy, a team-chat platform, and a Git-backed CMS. Rust engines for the hot paths, React and React Native for the apps. Own your data, run the whole stack yourself.",
  founder: "Benjamin C. Tehan",
  founded: 2026,
  socials: {
    github: "https://github.com/devforge-io",
    x: "https://x.com/devforge",
    discord: "https://discord.gg/hrUncrtZ6",
  },
} as const;

export type NavLink = { label: string; to: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Products", to: "/products" },
  { label: "Company", to: "/company" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_LINKS: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "Anvil DB", to: "/products/anvil-db" },
      { label: "Aegis", to: "/products/aegis" },
      { label: "Foundry", to: "/products/foundry" },
      { label: "Stencil", to: "/products/stencil" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Contact", to: "/contact" },
      { label: "All products", to: "/products" },
    ],
  },
];
