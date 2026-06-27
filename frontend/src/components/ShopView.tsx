import { For, Show, type Component } from "solid-js";
import { PRODUCTS } from "../data";
import { settings } from "../settings";
import type { Product } from "../types";

export const ShopView: Component = () => (
  <div>
    <header class="mb-4">
      <h2 class="text-2xl font-bold m-0">Butikk</h2>
      <p class="text-muted m-0">
        Få mer ut av Klatrepasset — fører, kurs, bedriftspakker og et fysisk pass. Medlemmer betaler mindre.
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <For each={PRODUCTS}>{(p) => <ProductCard product={p} />}</For>
    </div>

    <p class="text-xs text-muted mt-5">
      Demo-priser. Knappene er ikke koblet til betaling i denne MVP-en — kjøp og påmelding håndteres av
      et fremtidig <code>/backend</code>.
    </p>
  </div>
);

const ProductCard: Component<{ product: Product }> = (props) => (
  <section
    class="bg-white border rounded-2xl p-5 shadow-sm flex flex-col"
    classList={{
      "border-brand ring-1 ring-brand": props.product.highlight,
      "border-line": !props.product.highlight,
    }}
  >
    <div class="flex items-start justify-between gap-2">
      <span class="text-3xl">{props.product.icon}</span>
      <Show when={props.product.highlight}>
        <span class="text-[0.68rem] bg-brand text-white px-2 py-0.5 rounded-full font-semibold">
          Populær
        </span>
      </Show>
    </div>

    <h3 class="text-lg font-bold mt-3 mb-1">{props.product.name}</h3>
    <p class="text-sm text-muted m-0">{props.product.tagline}</p>

    <ul class="mt-3 mb-4 space-y-1.5 flex-1">
      <For each={props.product.features}>
        {(f) => (
          <li class="text-sm flex gap-2">
            <span class="text-track-green">✓</span>
            <span>{f}</span>
          </li>
        )}
      </For>
    </ul>

    <div class="mb-3">
      <Show
        when={props.product.memberPrice}
        fallback={<div class="text-2xl font-bold text-ink">{props.product.price}</div>}
      >
        {(mp) => (
          <Show
            when={settings().isMember}
            fallback={
              <>
                <div class="text-2xl font-bold text-ink">{props.product.price}</div>
                <div class="text-xs text-brand font-semibold mt-0.5">Som medlem: {mp()} — bli medlem og spar</div>
              </>
            }
          >
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-bold text-brand">{mp()}</span>
              <span class="text-sm text-muted line-through">{props.product.price}</span>
            </div>
            <div class="text-xs text-brand font-semibold mt-0.5">Medlemspris ✓</div>
          </Show>
        )}
      </Show>
    </div>

    <button class="w-full rounded-lg py-2.5 font-semibold cursor-pointer bg-brand text-white hover:bg-brand-dark">
      {props.product.cta}
    </button>
  </section>
);
