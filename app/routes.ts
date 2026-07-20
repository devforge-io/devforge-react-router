import type { RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { flatRoutes } from "remix-flat-routes";

// Routes are file-based via remix-flat-routes: every file in app/routes/ becomes a
// real route (its own URL, loader, meta and code-split bundle). This is deliberately
// NOT a single-page app — `/products/anvil-db`, `/company`, `/contact` etc. are
// distinct server-rendered documents.
export default remixRoutesOptionAdapter((defineRoutes) =>
  flatRoutes("routes", defineRoutes, {
    ignoredRouteFiles: [
      "**/*.css",
      "**/*.test.{js,jsx,ts,tsx}",
      "**/__*.*",
      "**/*.server.*",
      "**/*.client.*",
    ],
  }),
) satisfies RouteConfig;
