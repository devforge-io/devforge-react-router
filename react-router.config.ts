import type { Config } from "@react-router/dev/config";

export default {
  // Server-side render every route by default. This is a content site, not a SPA:
  // each route below is its own module with its own loader + meta, pre-rendered on
  // the server and hydrated on the client.
  ssr: true,
} satisfies Config;
