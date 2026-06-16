type LenisControls = {
  stop: () => void;
  start: () => void;
};

let controls: LenisControls | null = null;

/** Registra controles do Lenis (chamado pelo SmoothScroll). */
export function registerLenisControls(next: LenisControls | null) {
  controls = next;
}

export function pauseLenis() {
  controls?.stop();
}

export function resumeLenis() {
  controls?.start();
}
