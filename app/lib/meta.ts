import { SITE } from "~/data/site";

const OG_IMAGE = `${SITE.url}/og.png`;
const DEFAULT_TITLE = `${SITE.name} · ${SITE.tagline}`;

/**
 * Build a complete set of meta descriptors for a route.
 *
 * React Router renders only the *leaf* route's `meta` (child meta REPLACES parent
 * meta, they are not merged). So every route must emit the full Open Graph /
 * Twitter set itself; this helper keeps that DRY and consistent.
 */
export function pageMeta({
  title,
  description = SITE.description,
  path = "",
  image = OG_IMAGE,
}: {
  /** Full <title>; omit for the default home title. */
  title?: string;
  description?: string;
  /** Path portion of the canonical URL, e.g. "/products/aegis". */
  path?: string;
  image?: string;
} = {}) {
  const fullTitle = title ?? DEFAULT_TITLE;
  const url = `${SITE.url}${path}`;
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "theme-color", content: "#08060f" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: DEFAULT_TITLE },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    {
      tagName: "link",
      rel: "canonical",
      href: url,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.company,
        url: SITE.url,
        description: SITE.description,
        founder: { "@type": "Person", name: SITE.founder },
      },
    },
  ];
}
