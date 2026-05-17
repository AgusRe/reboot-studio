"use client"

/**
 * BackgroundOrbs — GPU-optimized decorative layer.
 *
 * Rules applied:
 * - Reduced to 5 orbs (was 13). Each blur-3xl element creates a compositor layer;
 *   too many saturate VRAM and cause frame drops on mid-range devices.
 * - Animated orbs hidden on mobile (hidden md:block) to protect battery/perf.
 * - will-change: transform applied only to animated elements.
 * - Static grid pattern kept because it never animates.
 */
export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Large orbs — desktop only */}
      <div
        className="absolute top-[10%] right-[15%] w-96 h-96 rounded-full bg-primary/8 blur-3xl animate-float-slow hidden md:block"
        style={{ willChange: "transform" }}
      />
      <div
        className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full bg-accent/8 blur-3xl animate-float hidden md:block"
        style={{ willChange: "transform", animationDelay: "2s" }}
      />

      {/* Medium orbs — desktop only */}
      <div
        className="absolute top-[40%] left-[25%] w-60 h-60 rounded-full bg-primary/6 blur-2xl animate-float-slow hidden md:block"
        style={{ willChange: "transform", animationDelay: "4s" }}
      />
      <div
        className="absolute bottom-[30%] right-[20%] w-56 h-56 rounded-full bg-primary/10 blur-2xl animate-float hidden md:block"
        style={{ willChange: "transform", animationDelay: "3s" }}
      />

      {/* Small pulse — visible everywhere, cheap to animate */}
      <div
        className="absolute top-[25%] right-[40%] w-28 h-28 rounded-full bg-primary/12 blur-xl animate-pulse-glow"
        style={{ willChange: "opacity", animationDelay: "0.5s" }}
      />

      {/* Grid Pattern — purely static, no layer promotion needed */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/25)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/25)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]" />
    </div>
  )
}
