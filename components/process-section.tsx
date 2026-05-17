"use client"

import { motion, useInView, useReducedMotion, animate } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { MessageSquare, Lightbulb, Code, Rocket } from "lucide-react"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
const STEP_FILL_MS = 1100   // How long a card border takes to fill
const LINE_FILL_MS = 500    // How long the connector line takes to fill
const STEP_GAP_MS  = 150    // Pause between card done → line starts
const LINE_GAP_MS  = 150    // Pause between line done → next card starts

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Conversación",
    description: "Nos cuentas tu desafío. Sin tecnicismos, sin presión. Solo necesitamos entender qué problema quieres resolver.",
    duration: "15-30 min",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Propuesta",
    description: "Investigamos las mejores opciones y te presentamos una solución clara, con alcance, tiempos y precio transparentes.",
    duration: "24-48 hrs",
  },
  {
    icon: Code,
    number: "03",
    title: "Desarrollo",
    description: "Manos a la obra. Te mantenemos al tanto del progreso y validamos contigo cada etapa importante.",
    duration: "Variable",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Lanzamiento",
    description: "Desplegamos tu solución, te capacitamos en su uso y nos aseguramos de que todo funcione perfecto.",
    duration: "Soporte incluido",
  },
]

// -------------------------------------------------------------------
// CardBorderAnimation
// Draws an SVG rect that traces the card border clockwise starting
// from the left-center (9 o'clock), uses strokeDashoffset to animate.
// Entirely compositor-driven: no layout, no paint.
// -------------------------------------------------------------------
function CardBorderAnimation({
  active,
  filled,
  width,
  height,
  radius = 16,
}: {
  active: boolean
  filled: boolean
  width: number
  height: number
  radius?: number
}) {
  // Perimeter of the rounded rect
  const perim = 2 * (width + height) - 8 * radius + 2 * Math.PI * radius
  const svgRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    if (active && !filled) {
      // Start the stroke trace
      el.style.strokeDashoffset = String(perim)
      const ctrl = animate(perim, 0, {
        duration: STEP_FILL_MS / 1000,
        ease: "linear",
        onUpdate: (v) => { el.style.strokeDashoffset = String(v) },
      })
      return () => ctrl.stop()
    }
    if (filled) {
      el.style.strokeDashoffset = "0"
    }
  }, [active, filled, perim])

  // Build rounded-rect path starting at left-center (clockwise)
  const x = 1, y = 1, w = width - 2, h = height - 2, r = radius
  // Start at left-center, go down then clockwise
  const path = `
    M ${x} ${y + h / 2}
    L ${x} ${y + r}
    Q ${x} ${y} ${x + r} ${y}
    L ${x + w - r} ${y}
    Q ${x + w} ${y} ${x + w} ${y + r}
    L ${x + w} ${y + h - r}
    Q ${x + w} ${y + h} ${x + w - r} ${y + h}
    L ${x + r} ${y + h}
    Q ${x} ${y + h} ${x} ${y + h - r}
    L ${x} ${y + h / 2}
  `.trim()

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={width}
      height={height}
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      {/* Track */}
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-border"
        strokeDasharray={`${perim}`}
        strokeDashoffset="0"
        opacity={0.3}
      />
      {/* Fill */}
      <path
        ref={svgRef}
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary"
        strokeDasharray={`${perim}`}
        strokeDashoffset={String(perim)}
        strokeLinecap="round"
        style={{ willChange: "stroke-dashoffset" }}
      />
    </svg>
  )
}

// -------------------------------------------------------------------
// ConnectorLine — fills left-to-right via scaleX (compositor only)
// -------------------------------------------------------------------
function ConnectorLine({ active, filled }: { active: boolean; filled: boolean }) {
  return (
    <div className="hidden lg:block absolute top-1/2 left-full -translate-y-1/2 h-px w-8 z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-border/60" />
      <motion.div
        className="absolute top-0 left-0 h-full w-full bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: filled ? 1 : 0 }}
        transition={{ duration: LINE_FILL_MS / 1000, ease: "linear" }}
        style={{ willChange: "transform" }}
      />
    </div>
  )
}

// -------------------------------------------------------------------
// ProcessSection
// -------------------------------------------------------------------
export function ProcessSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const isInView    = useInView(sectionRef, { once: true, margin: "-100px" })
  const reducedMot  = useReducedMotion()

  // cardStates[i]: "idle" | "filling" | "done"
  const [cardStates, setCardStates]     = useState<Array<"idle" | "filling" | "done">>(steps.map(() => "idle"))
  // lineStates[i]: whether connector i→i+1 is filled
  const [lineStates, setLineStates]     = useState<boolean[]>(steps.map(() => false))
  const [cardSizes,  setCardSizes]      = useState<Array<{ w: number; h: number }>>(steps.map(() => ({ w: 0, h: 0 })))

  // Measure card sizes after mount
  useEffect(() => {
    const obs = new ResizeObserver(() => {
      setCardSizes(cardRefs.current.map((el) => ({
        w: el?.offsetWidth  ?? 0,
        h: el?.offsetHeight ?? 0,
      })))
    })
    cardRefs.current.forEach((el) => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // Sequential animation driver
  useEffect(() => {
    if (!isInView) return
    if (reducedMot) {
      setCardStates(steps.map(() => "done"))
      setLineStates(steps.map(() => true))
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    let cursor = 600 // initial delay

    steps.forEach((_, i) => {
      // Start filling card i
      timers.push(setTimeout(() => {
        setCardStates((prev) => {
          const next = [...prev]; next[i] = "filling"; return next
        })
      }, cursor))
      cursor += STEP_FILL_MS

      // Card i done
      timers.push(setTimeout(() => {
        setCardStates((prev) => {
          const next = [...prev]; next[i] = "done"; return next
        })
      }, cursor))
      cursor += STEP_GAP_MS

      // Fill connector line (only for i < last)
      if (i < steps.length - 1) {
        timers.push(setTimeout(() => {
          setLineStates((prev) => {
            const next = [...prev]; next[i] = true; return next
          })
        }, cursor))
        cursor += LINE_FILL_MS + LINE_GAP_MS
      }
    })

    return () => timers.forEach(clearTimeout)
  }, [isInView, reducedMot])

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="proceso-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-transparent to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.primary/8)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-primary/6 blur-3xl animate-float-slow hidden md:block" />
        <div className="absolute bottom-[15%] left-[15%] w-48 h-48 rounded-full bg-accent/6 blur-2xl animate-float hidden md:block" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[50%] left-[5%] w-32 h-32 rounded-full bg-primary/8 blur-xl animate-pulse-glow hidden md:block" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-mono tracking-wider uppercase">Proceso</span>
          <h2
            id="proceso-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-balance"
          >
            Simple, transparente, efectivo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Sin burocracia innecesaria. De la idea a la realidad
            en el menor tiempo posible.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const state    = cardStates[index]
            const isFilled = state === "done"
            const isActive = state === "filling"

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.06, ease: EASE_OUT_EXPO }}
                className="relative"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Connector to next card */}
                {index < steps.length - 1 && (
                  <ConnectorLine active={lineStates[index]} filled={lineStates[index]} />
                )}

                {/* Card */}
                <div
                  ref={(el) => { cardRefs.current[index] = el }}
                  className={`relative bg-card rounded-2xl p-8 h-full overflow-visible transition-[box-shadow] duration-500 ${
                    isFilled ? "shadow-[0_0_30px_oklch(var(--primary)_/_0.15)]" : ""
                  }`}
                >
                  {/* SVG border trace */}
                  {cardSizes[index].w > 0 && (
                    <CardBorderAnimation
                      active={isActive}
                      filled={isFilled}
                      width={cardSizes[index].w}
                      height={cardSizes[index].h}
                      radius={16}
                    />
                  )}

                  {/* Subtle fill tint once done */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/8 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isFilled ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    {/* Number Badge */}
                    <div
                      className={`w-12 h-12 border rounded-full flex items-center justify-center mb-6 mx-auto lg:mx-0 transition-colors duration-500 ${
                        isFilled ? "bg-primary border-primary" : "bg-secondary border-border"
                      }`}
                    >
                      <span
                        className={`text-sm font-mono transition-colors duration-500 ${
                          isFilled ? "text-primary-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-500 ${
                        isFilled ? "bg-primary/20" : "bg-primary/10"
                      }`}
                    >
                      <step.icon
                        className={`w-5 h-5 transition-colors duration-500 ${
                          isFilled ? "text-primary" : "text-primary/70"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.description}</p>

                    {/* Duration Badge */}
                    <span
                      className={`inline-block text-xs font-mono px-3 py-1 rounded-full transition-colors duration-500 ${
                        isFilled ? "text-primary bg-primary/20" : "text-primary/70 bg-primary/10"
                      }`}
                    >
                      {step.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}