"use client"

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, MessageSquare, ArrowUpRight, CheckCircle2 } from 'lucide-react'

export function ContactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("sending")
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState("sent")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section 
      ref={sectionRef}
      id="contacto" 
      className="relative py-16 px-6 overflow-hidden"
      aria-labelledby="contacto-heading"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Floating Panel Container */}
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-mono tracking-wider uppercase">Contacto</span>
            <h2 
              id="contacto-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-balance"
            >
              Cuéntanos tu desafío
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              No importa si tienes una idea clara o solo una corazonada. 
              Estamos aquí para escucharte y encontrar la mejor solución juntos.
            </p>

            {/* Contact Benefits */}
            <div className="space-y-4 mb-8">
              {[
                "Respuesta en menos de 24 horas",
                "Propuesta clara sin compromiso",
                "Presupuesto transparente desde el inicio",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Direct Contact */}
            <div className="pt-8 border-t border-border space-y-4">
              <p className="text-sm text-muted-foreground">¿Prefieres contacto directo?</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:hola@reboot.studio"
                  className="group inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hola@reboot.studio
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card/50 border border-border rounded-3xl p-8 md:p-10">
              {formState === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
                  <p className="text-muted-foreground mb-6">
                    Te responderemos en menos de 24 horas. Mientras tanto, ¿qué tal un juego en el Arcade?
                  </p>
                  <a
                    href="#arcade"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    Ir al Arcade →
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Empresa / Proyecto
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Nombre de tu empresa o proyecto"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                      Presupuesto estimado
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="">Selecciona un rango</option>
                      <option value="small">Menos de $1,000 USD</option>
                      <option value="medium">$1,000 - $5,000 USD</option>
                      <option value="large">$5,000 - $15,000 USD</option>
                      <option value="enterprise">Más de $15,000 USD</option>
                      <option value="unknown">No estoy seguro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Cuéntanos sobre tu proyecto *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                      placeholder="¿Qué problema quieres resolver? ¿Tienes una idea de cómo sería la solución ideal?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-xl font-medium hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formState === "sending" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    Al enviar este formulario, aceptas que te contactemos para hablar sobre tu proyecto.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
