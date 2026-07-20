import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { SiteNav } from "~/components/site-nav";
import { SiteFooter } from "~/components/site-footer";
import { Cta } from "~/components/primitives";
import { pageMeta } from "~/lib/meta";
import "./app.css";

// Default meta — used on error/fallback renders. Each leaf route emits its own
// full set via pageMeta(), because React Router does not merge parent meta.
export function meta(_: Route.MetaArgs) {
  return pageMeta();
}

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-[#08060f] font-sans text-white antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <SiteNav />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let code = "Error";
  let message = "Something went wrong in the forge.";

  if (isRouteErrorResponse(error)) {
    code = String(error.status);
    message =
      error.status === 404
        ? "That page could not be found. It may have been moved or never forged."
        : error.statusText || message;
  } else if (import.meta.env.DEV && error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, rgba(249,115,22,0.14) 0%, transparent 55%)",
        }}
      />
      <p className="relative font-mono text-7xl font-semibold text-molten">
        {code}
      </p>
      <p className="relative mt-4 max-w-md text-lg text-white/60">{message}</p>
      <div className="relative mt-8">
        <Cta to="/">Back to the forge</Cta>
      </div>
    </div>
  );
}
