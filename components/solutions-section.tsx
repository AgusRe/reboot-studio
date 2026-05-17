 "use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef } from "react"
import { Code2, Zap, Palette, Database, Workflow, Globe } from "lucide-react"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const services = [
  {
    icon: Palette,
    title: "Diseño & Desarrollo Web",
    description: "Landing pages, sitios corporativos y aplicaciones web que convierten visitantes en clientes.",
    features: ["Landing pages de alta conversión", "Diseño UI/UX estratégico", "Desarrollo responsive"],
  },
  {
    icon: Workflow,
    title: "Automatizaciones",
    description: "Elimina tareas repetitivas. Conectamos tus herramientas para que tu negocio trabaje mientras duermes.",
    features: ["Flujos de trabajo automatizados", "Integraciones entre apps", "Bots y notificaciones"],
  },
  {
    icon: Database,
    title: "Integraciones & APIs",
    description: "Conectamos sistemas que parecían imposibles de unir. Tu stack tecnológico, perfectamente sincronizado.",
    features: ["APIs personalizadas", "Sincronización de datos", "Webhooks y triggers"],
  },
  {
    icon: Code2,
    title: "Desarrollo a Medida",
    description: "Soluciones que no existen en el mercado. Si lo puedes imaginar, lo podemos construir.",
    features: ["Software personalizado", "MVPs rápidos", "Escalabilidad garantizada"],
  },
  {
    icon: Zap,
    title: "Optimización & Performance",
    description: "Tu sitio web más rápido, tu SEO mejorado, tus conversiones multiplicadas.",
    features: ["Auditorías de velocidad", "Optimización SEO técnico", "Mejora de conversiones"],
  },
  {
    icon: Globe,
    title: "Consultoría Digital",
    description: "No sabes por dónde empezar? Te guiamos en la estrategia digital perfecta para tu negocio.",
    features: ["Análisis de necesidades", "Roadmap tecnológico", "Acompañamiento continuo"],
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

export function SolutionsSection() {
  return (
    <section
      id="soluciones"
      className="relative py-16 px-6 overflow-hidden"
      aria-labelledby="soluciones-heading"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-mono tracking-wider uppercase">Servicios</span>
          <h2
            id="soluciones-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-balance"
          >
            Soluciones para cada desafío
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            No importa la complejidad. Investigamos, diseñamos y ejecutamos
            la solución perfecta para tu caso específico.
          </p>
        </motion.div>

        {/* Services Grid — stagger bottom-to-top via whileInView */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={itemVariants}
              className="group relative bg-card/50 border border-border rounded-2xl p-8 hover:border-primary/50 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_0_40px_oklch(var(--primary)_/_0.1)]"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-150">
                <service.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover gradient — opacity only, GPU composited */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">¿No encontrás lo que buscás?</p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4"
          >
            Contanos tu proyecto y lo hacemos realidad
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
