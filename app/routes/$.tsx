import type { Route } from "./+types/$";

// Catch-all for unmatched URLs. Throwing a 404 Response here surfaces the root
// ErrorBoundary with the correct HTTP status (rather than a soft 200 page).
export function loader(_: Route.LoaderArgs) {
  throw new Response("Not found", { status: 404 });
}

export default function CatchAll() {
  return null;
}
