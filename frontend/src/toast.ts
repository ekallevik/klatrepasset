import { createSignal } from "solid-js";

export interface Toast {
  id: number;
  icon: string;
  title: string;
  sub?: string;
}

const [toasts, setToasts] = createSignal<Toast[]>([]);
export { toasts };

let nextId = 1;
const DURATION_MS = 3500;

export function pushToast(toast: Omit<Toast, "id">): void {
  const id = nextId++;
  setToasts([...toasts(), { ...toast, id }]);
  setTimeout(() => setToasts(toasts().filter((t) => t.id !== id)), DURATION_MS);
}
