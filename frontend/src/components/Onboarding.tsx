import { Show, type Component } from "solid-js";
import { SEASON } from "../data";
import { setSetting, settings } from "../settings";

export const Onboarding: Component = () => {
  const dismiss = () => setSetting("seenOnboarding", true);

  return (
    <Show when={!settings().seenOnboarding}>
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
          <div class="text-5xl text-center">🧗</div>
          <h2 class="text-2xl font-bold text-center mt-2 mb-1">Velkommen til Klatrepasset</h2>
          <p class="text-muted text-center m-0">
            Tur-orientering for klatring i Oslo. Samle felt og ruter i ditt eget tempo gjennom {SEASON.label}.
          </p>

          <ul class="mt-5 space-y-3">
            <li class="flex gap-3">
              <span class="text-xl">🟢</span>
              <span class="text-sm">
                <strong>Helt fersk eller med familie?</strong> Start på det grønne sporet — lave buldreblokker og
                topptau-vennlige felt.
              </span>
            </li>
            <li class="flex gap-3">
              <span class="text-xl">🎯</span>
              <span class="text-sm">
                <strong>Sjekk inn</strong> med koden på toppen av ruten — eller på tillit. Du samler poeng og merker.
              </span>
            </li>
            <li class="flex gap-3">
              <span class="text-xl">🍻</span>
              <span class="text-sm">
                <strong>Bli med på treff</strong> på feltene — grilling, teknikktips og sosialt med klubben.
              </span>
            </li>
          </ul>

          <button
            onClick={dismiss}
            class="w-full mt-6 rounded-lg py-3 font-semibold cursor-pointer bg-brand text-white hover:bg-brand-dark"
          >
            Kom i gang
          </button>
        </div>
      </div>
    </Show>
  );
};
