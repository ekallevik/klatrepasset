import { createSignal, Show, type Component } from "solid-js";
import { AREAS, MASTER_CODE } from "../data";
import type { Route } from "../types";
import { completeRoute } from "../store";
import { checkInRoute, setCheckInRoute } from "../ui";

export const CheckInModal: Component = () => (
  <Show when={checkInRoute()}>{(route) => <ModalInner route={route()} />}</Show>
);

const ModalInner: Component<{ route: Route }> = (props) => {
  const [code, setCode] = createSignal("");
  const [msg, setMsg] = createSignal<{ text: string; ok: boolean } | null>(null);
  const area = () => AREAS.find((a) => a.id === props.route.areaId);

  const close = () => setCheckInRoute(null);

  const submitCode = () => {
    const entered = code().trim().toUpperCase();
    if (entered === props.route.checkInCode || entered === MASTER_CODE) {
      completeRoute(props.route.id, "code");
      setMsg({ text: "✓ Riktig kode! Ruten er tikket.", ok: true });
      setTimeout(close, 700);
    } else {
      setMsg({ text: "Feil kode. Sjekk plata på toppen og prøv igjen.", ok: false });
    }
  };

  const honor = () => {
    completeRoute(props.route.id, "honor");
    close();
  };

  return (
    <div
      class="fixed inset-0 bg-black/45 flex items-center justify-center p-4 z-20"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div class="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
        <button
          onClick={close}
          aria-label="Lukk"
          class="absolute top-2 right-3 text-2xl text-muted cursor-pointer leading-none bg-transparent border-0"
        >
          ×
        </button>

        <h3 class="text-lg font-bold mt-0 mb-1">Sjekk inn: {props.route.name}</h3>
        <p class="text-muted text-sm mb-5 mt-0">
          {area()?.name} · {props.route.discipline} · grad {props.route.grade} · {props.route.points} poeng
        </p>

        <label class="text-sm font-semibold block mb-1">Tast koden fra plata på toppen</label>
        <input
          value={code()}
          onInput={(e) => setCode(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && submitCode()}
          maxLength={4}
          placeholder="••••"
          autocomplete="off"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autofocus
          class="w-full text-2xl tracking-[0.3em] text-center uppercase p-3 border-2 border-line rounded-xl mb-2 focus:outline-none focus:border-brand"
        />

        <Show when={msg()}>
          {(m) => (
            <p class="text-sm mb-3 mt-0" classList={{ "text-track-green": m().ok, "text-red-600": !m().ok }}>
              {m().text}
            </p>
          )}
        </Show>

        <button
          onClick={submitCode}
          class="w-full rounded-lg py-2.5 font-semibold cursor-pointer bg-brand text-white hover:bg-brand-dark"
        >
          Bekreft kode
        </button>

        <p class="text-center text-muted text-sm my-3.5">— eller —</p>

        <button
          onClick={honor}
          class="w-full rounded-lg py-2.5 font-semibold cursor-pointer bg-emerald-50 text-brand-dark hover:bg-emerald-100"
        >
          Registrer på tillit
        </button>
      </div>
    </div>
  );
};
