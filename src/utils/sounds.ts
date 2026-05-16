// Programmatic sound effects using Web Audio API — works offline, no dependencies

let audioCtx: AudioContext | null = null;

const getCtx = (): AudioContext => {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
};

/** Short tick/click sound */
export const playTick = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 1200;
  osc.type = "sine";
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
};

/** Spin whoosh — rising pitch */
export const playSpinStart = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.4);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, ctx.currentTime);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.5);
};

/** Coin flip metallic sound */
export const playCoinFlip = () => {
  const ctx = getCtx();
  const t = ctx.currentTime;

  // Metallic ping sequence
  for (let i = 0; i < 4; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 2400 + i * 300;
    const start = t + i * 0.12;
    gain.gain.setValueAtTime(0.12, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.1);
    osc.start(start);
    osc.stop(start + 0.1);
  }
};

/** Success fanfare — result reveal */
export const playResultReveal = () => {
  const ctx = getCtx();
  const t = ctx.currentTime;
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = freq;
    const start = t + i * 0.1;
    gain.gain.setValueAtTime(0.15, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
    osc.start(start);
    osc.stop(start + 0.25);
  });
};

/** Suspense building — for Y/N and T/D countdown */
export const playSuspense = () => {
  const ctx = getCtx();
  const t = ctx.currentTime;

  for (let i = 0; i < 6; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "triangle";
    osc.frequency.value = 400 + i * 80;
    const start = t + i * 0.15;
    gain.gain.setValueAtTime(0.08 + i * 0.015, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.12);
    osc.start(start);
    osc.stop(start + 0.12);
  }
};

/** Negative buzz — for NO / wrong */
export const playBuzz = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "square";
  osc.frequency.value = 150;
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
};
