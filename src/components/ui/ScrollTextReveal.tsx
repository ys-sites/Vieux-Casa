import { useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number; decay: number;
  r: number; g: number; b: number;
}

// 4-state machine per element
//  dispersed  ──(scroll down, enters viewport)──►  rising  ──(anim done)──►  stable
//  stable     ──(scroll up, enters bottom ¼)────►  dispersing  ──(done)──►  dispersed
type AnimState = "dispersed" | "rising" | "stable" | "dispersing";

interface Registration {
  wrap: HTMLElement;
  getState: () => AnimState;
  riseUp: () => void;
  disperse: () => void;
}

// ─── Global scroll manager ────────────────────────────────────────────────────
// One listener drives all registered instances. Throttled with rAF.

const registry = new Set<Registration>();
let lastScrollY = 0;
let scrollDir: "up" | "down" = "down";
let rafPending = false;
let managerReady = false;

function tick() {
  rafPending = false;
  const vh = window.innerHeight;

  for (const reg of registry) {
    const rect = reg.wrap.getBoundingClientRect();
    const state = reg.getState();

    if (scrollDir === "down" && (state === "dispersed" || state === "dispersing")) {
      // Start rise-up ~120px before element fully enters viewport;
      // also interrupt an in-progress dispersion if user reverses direction
      if (rect.top < vh + 120 && rect.bottom > 0) {
        reg.riseUp();
      }
    }

    if (scrollDir === "up" && state === "stable") {
      // Element slides into the bottom ¼ of the viewport while scrolling up → disperse
      // rect.top > vh*0.75 means the element top is within the last 25% of screen height
      if (rect.top > vh * 0.75 && rect.top < vh) {
        reg.disperse();
      }
    }
  }
}

function onScroll() {
  const y = window.scrollY;
  scrollDir = y > lastScrollY ? "down" : "up";
  lastScrollY = y;
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(tick);
  }
}

function ensureManager() {
  if (managerReady || typeof window === "undefined") return;
  managerReady = true;
  lastScrollY = window.scrollY;
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ─── Pixel sampler ─────────────────────────────────────────────────────────
// Walks all text nodes, renders each word to an offscreen canvas at the
// word's exact screen position (via Range.getClientRects), then reads
// getImageData to find the filled pixels that become particles.

function samplePixels(el: HTMLElement, fallback: string): Particle[] {
  const rect = el.getBoundingClientRect();
  if (!rect.width || !rect.height) return [];

  const W = Math.ceil(rect.width);
  const H = Math.ceil(rect.height);
  const oc = document.createElement("canvas");
  oc.width = W; oc.height = H;
  const ctx = oc.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  const range = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let node: Node | null;

  while ((node = walker.nextNode())) {
    const tn = node as Text;
    if (!tn.textContent?.trim()) continue;
    const parent = tn.parentElement;
    if (!parent) continue;

    const cs = window.getComputedStyle(parent);
    // ShinyText sets -webkit-text-fill-color: transparent (gradient clip text).
    // Use the caller-supplied fallback color so particles are visible.
    const fill = cs.getPropertyValue("-webkit-text-fill-color");
    const color =
      fill === "transparent" ||
      cs.color === "rgba(0, 0, 0, 0)" ||
      cs.color === "transparent"
        ? fallback
        : cs.color;

    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    ctx.fillStyle = color;
    ctx.textBaseline = "top";

    const text = tn.textContent;
    const re = /\S+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      try {
        range.setStart(tn, m.index);
        range.setEnd(tn, m.index + m[0].length);
        for (const r of Array.from(range.getClientRects())) {
          ctx.fillText(m[0], r.left - rect.left, r.top - rect.top);
        }
      } catch { /* Range errors on detached nodes — safe to skip */ }
    }
  }

  const { data } = ctx.getImageData(0, 0, W, H);
  const out: Particle[] = [];
  const STEP = 4; // sample every 4 px → dense but cheap

  for (let py = 0; py < H; py += STEP) {
    for (let px = 0; px < W; px += STEP) {
      const i = (py * W + px) * 4;
      if (data[i + 3] < 100) continue;
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 5;
      out.push({
        x: px, y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.8,
        alpha: 1,
        decay: 0.005 + Math.random() * 0.008,
        r: data[i], g: data[i + 1], b: data[i + 2],
      });
    }
  }
  return out;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  children: any;
  className?: string;
  wrapperClassName?: string;
  /** CSS transition delay (seconds) for the rise-up entrance */
  delay?: number;
  /** Fallback colour for gradient/transparent text (e.g. ShinyText) */
  textColor?: string;
}

export default function ScrollTextReveal({
  children,
  className = "",
  wrapperClassName = "",
  delay = 0,
  textColor = "#1a1c19",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cvRef   = useRef<HTMLCanvasElement>(null);
  const psRef   = useRef<Particle[]>([]);
  const rafRef  = useRef<number | null>(null);
  const state   = useRef<AnimState>("dispersed");

  useEffect(() => {
    ensureManager();
    const wrap = wrapRef.current;
    const text = textRef.current;
    const cv   = cvRef.current;
    if (!wrap || !text || !cv) return;

    // ── Rise-up ───────────────────────────────────────────────────────────
    const riseUp = () => {
      if (state.current === "stable" || state.current === "rising") return;

      const wasDispersing = state.current === "dispersing";

      // Abort any live dispersion — canvas hides, particles cleared
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      cv.style.display = "none";
      psRef.current = [];

      state.current = "rising";
      text.style.transition = "none";
      text.style.opacity    = "0";

      if (!wasDispersing) {
        // Coming from fully dispersed: slide in from below
        text.style.transform = "translateY(30px)";
      }
      // Coming from dispersing: text is already at translateY(0), just fade in — no blank frame

      // One rAF to let the browser apply the reset before starting the transition
      requestAnimationFrame(() => {
        text.style.transition =
          `opacity 0.35s ease ${delay}s, transform 0.43s cubic-bezier(0.16,1,0.3,1) ${delay}s`;
        text.style.opacity   = "1";
        text.style.transform = "translateY(0px)";

        // Promote to stable after the full animation duration has elapsed
        const ms = (delay + 0.43) * 1000 + 50;
        setTimeout(() => {
          if (state.current === "rising") state.current = "stable";
        }, ms);
      });
    };

    // ── Pixel dispersion ──────────────────────────────────────────────────
    const disperse = () => {
      if (state.current !== "stable") return;
      state.current = "dispersing";

      const r = text.getBoundingClientRect();
      cv.width  = Math.ceil(r.width);
      cv.height = Math.ceil(r.height);
      cv.style.width  = r.width  + "px";
      cv.style.height = r.height + "px";
      cv.style.display = "block";

      psRef.current = samplePixels(text, textColor);

      // Hide the DOM text so only the canvas particles are seen
      text.style.transition = "none";
      text.style.opacity    = "0";

      const ctx2d = cv.getContext("2d");
      if (!ctx2d || psRef.current.length === 0) {
        cv.style.display  = "none";
        state.current     = "dispersed";
        text.style.transform = "translateY(30px)";
        return;
      }

      const animParticles = () => {
        ctx2d.clearRect(0, 0, cv.width, cv.height);
        let alive = 0;

        for (const p of psRef.current) {
          if (p.alpha <= 0) continue;
          alive++;
          p.x += p.vx;   p.y += p.vy;
          p.vx *= 0.985; p.vy *= 0.985;
          p.alpha -= p.decay;
          ctx2d.globalAlpha = Math.max(0, p.alpha);
          ctx2d.fillStyle   = `rgb(${p.r},${p.g},${p.b})`;
          ctx2d.fillRect(Math.round(p.x), Math.round(p.y), 4, 4);
        }

        ctx2d.globalAlpha = 1;

        if (alive > 0) {
          rafRef.current = requestAnimationFrame(animParticles);
        } else {
          cv.style.display     = "none";
          psRef.current        = [];
          state.current        = "dispersed";
          // Pre-position for next rise-up
          text.style.transform = "translateY(30px)";
        }
      };

      rafRef.current = requestAnimationFrame(animParticles);
    };

    // Register with the global manager
    const reg: Registration = {
      wrap,
      getState: () => state.current,
      riseUp,
      disperse,
    };
    registry.add(reg);

    // Initial visibility check: if already in viewport on mount, rise up immediately
    const initTimer = setTimeout(() => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh && rect.bottom > 0 && state.current === "dispersed") {
        riseUp();
      }
    }, 80);

    return () => {
      registry.delete(reg);
      clearTimeout(initTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [delay, textColor]);

  return (
    <div ref={wrapRef} className={wrapperClassName} style={{ position: "relative" }}>
      <div
        ref={textRef}
        className={className}
        style={{ opacity: 0, transform: "translateY(30px)" }}
      >
        {children}
      </div>
      <canvas
        ref={cvRef}
        style={{
          position: "absolute",
          top: 0, left: 0,
          pointerEvents: "none",
          display: "none",
        }}
      />
    </div>
  );
}
