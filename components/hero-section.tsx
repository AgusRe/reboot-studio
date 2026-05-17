"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={containerRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Sección principal"
    >
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Estudio de soluciones digitales</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          <span className="block text-balance">Tu desafío digital,</span>
          <span className="block text-primary mt-2">nuestra especialidad.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed text-balance"
        >
          Desde una landing page hasta automatizaciones complejas. 
          No nos limitamos tecnológicamente, investigamos para ofrecerte 
          la <span className="text-foreground">solución ideal</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contacto"
            className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all hover:scale-105"
          >
            Cuéntanos tu proyecto
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="#servicios"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-6 py-4 transition-colors"
          >
            Ver qué hacemos
            <span className="text-sm">↓</span>
          </Link>
        </motion.div>

        {/* Scroll Indicator - Above Technologies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>

        {/* Trust Indicators - Equal spacing top and bottom, closer to text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 py-4 border-t border-b border-border/50"
        >
          <p className="text-sm text-muted-foreground mb-4">Tecnologías que dominamos</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground/60">
            {["React", "Next.js", "Node.js", "Python", "AWS", "Zapier", "Make", "n8n"].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-sm font-mono hover:text-foreground transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
