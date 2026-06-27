import { For, Show, type Component } from "solid-js";
import { toasts } from "../toast";

export const Toaster: Component = () => (
  <div class="fixed bottom-4 inset-x-0 z-30 flex flex-col items-center gap-2 px-4 pointer-events-none">
    <For each={toasts()}>
      {(t) => (
        <div class="toast-in bg-ink text-white rounded-xl shadow-2xl px-4 py-3 flex items-center gap-3 max-w-sm w-full">
          <span class="text-2xl leading-none">{t.icon}</span>
          <div class="min-w-0">
            <div class="font-bold leading-tight">{t.title}</div>
            <Show when={t.sub}>{(sub) => <div class="text-sm text-white/75">{sub()}</div>}</Show>
          </div>
        </div>
      )}
    </For>
  </div>
);
