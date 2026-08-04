import type { Route } from "./+types/products.stencil";
import { getProduct } from "~/data/products";
import { SITE } from "~/data/site";
import { ProductPage } from "~/components/product-page";
import { pageMeta } from "~/lib/meta";

const SLUG = "stencil";

export function meta(_: Route.MetaArgs) {
  const p = getProduct(SLUG);
  if (!p) return pageMeta();
  return pageMeta({
    title: `${p.name} · ${p.eyebrow} · ${SITE.name}`,
    description: p.subtitle,
    path: `/products/${p.slug}`,
  });
}

export default function StencilRoute() {
  const product = getProduct(SLUG);
  if (!product) throw new Response("Not found", { status: 404 });
  return <ProductPage product={product} />;
}
