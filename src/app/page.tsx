"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const BOOKING_URL = "https://wa.me/573106460010?text=Hola%20Pacho%2C%20quiero%20informaci%C3%B3n%20sobre%20automatizaci%C3%B3n%20de%20procesos%20y%20canales%20para%20mi%20negocio";
const CONTACT_LABEL = "WhatsApp: +57 310 6460010";

const PORTFOLIO = [
  {
    name: "Arca Build",
    logo: "/logo-arca.jpg",
    url: "https://arcabuild.co",
    industry: "Construcción",
    desc: "Automatización de procesos operativos, coordinación interna y gestión de solicitudes para una empresa de construcción modular.",
  },
  {
    name: "Home Inspections Halley",
    logo: "/logo-halley.jpg",
    url: "https://homeinspectionshalley.com",
    industry: "Servicios inmobiliarios",
    desc: "Sistema de atención y agendamiento para inspecciones, con respuestas automáticas y filtro de prospectos.",
  },
  {
    name: "Bumbei",
    logo: "/logo-bumbei.jpg",
    url: "https://bumbei.com",
    industry: "Fintech",
    desc: "Automatización de soporte y comunicación para usuarios y partners a través de múltiples canales.",
  },
  {
    name: "Galeonica",
    logo: "/logo-galeonica.jpg",
    url: "https://galeonica.com",
    industry: "Fintech B2B",
    desc: "Procesos automatizados para onboarding comercial, soporte y operación con partners.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico del negocio",
    desc: "Revisamos tus procesos, tus canales de comunicación y detectamos dónde estás perdiendo tiempo, dinero o velocidad.",
  },
  {
    n: "02",
    title: "Diseño e implementación",
    desc: "Construimos la automatización, definimos flujos, conectamos herramientas y dejamos todo listo para operar.",
  },
  {
    n: "03",
    title: "Salida en vivo",
    desc: "Lanzamos, probamos contigo y afinamos lo necesario para que el sistema empiece a trabajar desde el día uno.",
  },
];

const USE_CASES = [
  { emoji: "💬", label: "Canales de atención", desc: "WhatsApp, formularios, correo, chat web y Telegram" },
  { emoji: "🧾", label: "Cotizaciones y solicitudes", desc: "Captura, clasificación y seguimiento automático" },
  { emoji: "📅", label: "Agendamiento", desc: "Citas, reservas, recordatorios y confirmaciones" },
  { emoji: "🛒", label: "Ventas y soporte", desc: "Preguntas frecuentes, pedidos y postventa" },
  { emoji: "🗂️", label: "Procesos internos", desc: "Tareas repetitivas, validaciones y handoff al equipo" },
  { emoji: "📈", label: "Seguimiento comercial", desc: "Leads, pipeline y reactivación de oportunidades" },
];

const PLANS = [
  {
    name: "Base",
    price: "Desde COP 1.800.000",
    features: [
      "Automatización de 1 proceso o canal",
      "Configuración inicial y salida en vivo",
      "Mensajería, formularios o flujo de atención",
      "Entrega rápida y capacitación básica",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "Desde COP 3.500.000",
    features: [
      "Automatización de varios procesos o canales",
      "Integraciones con CRM, Sheets o herramientas del negocio",
      "Flujos con reglas, filtros y escalamiento",
      "Capacitación del equipo y acompañamiento inicial",
    ],
    highlight: true,
  },
  {
    name: "Soporte mensual",
    price: "Desde COP 350.000/mes",
    features: [
      "Monitoreo y ajustes continuos",
      "Mejoras menores y optimización",
      "Soporte operativo",
      "Infraestructura y uso de IA pagados por el cliente",
    ],
    highlight: false,
  },
];

function DarkModeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Cambiar modo oscuro"
      className="w-9 h-9 flex items-center justify-center rounded-lg transition"
      style={{ border: "1px solid var(--hontley-border)", color: "var(--hontley-muted)" }}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("hontley-dark");
    if (stored === "true") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("hontley-dark", String(next));
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--hontley-black)", letterSpacing: "-0.03em" }}>
          Hontley
        </span>
        <div className="flex items-center gap-3">
          <DarkModeToggle dark={dark} onToggle={toggleDark} />
          <a
            href={BOOKING_URL}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition"
            style={{ background: "var(--hontley-accent)", color: "#fff" }}
          >
            Hablar con Pacho
          </a>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
        <div
          className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-6"
          style={{ background: "var(--hontley-gray)", color: "var(--hontley-accent)" }}
        >
          🇨🇴 Automatización de procesos y canales para negocios en Colombia
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          Menos operación manual,<br />
          <span style={{ color: "var(--hontley-accent)" }}>más velocidad y control.</span>
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8" style={{ color: "var(--hontley-muted)" }}>
          Ayudamos a negocios en Colombia a automatizar procesos repetitivos y canales de comunicación,
          para responder más rápido, ordenar mejor la operación y dejar al equipo enfocado en lo importante.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={BOOKING_URL}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-base transition hover:brightness-110"
            style={{ background: "var(--hontley-accent)", color: "#fff" }}
          >
            Escríbele a Pacho →
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-base transition"
            style={{ border: "1px solid var(--hontley-border)", color: "var(--hontley-muted)" }}
          >
            Ver cómo funciona
          </a>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: "var(--hontley-gray)", borderLeft: "4px solid var(--hontley-accent)" }}
        >
          <p className="text-lg italic" style={{ color: "var(--foreground)" }}>
            &ldquo;Lo usamos para operación, inventario, tiempos del equipo y seguimiento interno. Se volvió como tener un gerente operativo que nunca duerme.&rdquo;
          </p>
          <p className="mt-3 text-sm font-medium" style={{ color: "var(--hontley-muted)" }}>
            — Harvey, <a href="https://arcabuild.co" target="_blank" rel="noopener noreferrer" className="hover:underline">Arca Build</a>
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Casos reales</h2>
        <p className="text-center mb-10" style={{ color: "var(--hontley-muted)" }}>
          Soluciones reales para negocios que necesitan operar mejor y atender más rápido.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PORTFOLIO.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-5 flex gap-4 items-start transition hover:scale-[1.01]"
              style={{ border: "1px solid var(--hontley-border)", background: "var(--background)" }}
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={48}
                height={48}
                className="rounded-xl shrink-0 mt-0.5 object-cover"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-base group-hover:underline">{p.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--hontley-gray)", color: "var(--hontley-muted)" }}>
                    {p.industry}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--hontley-muted)" }}>{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Cómo trabajamos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center space-y-3">
              <div className="text-4xl font-black" style={{ color: "var(--hontley-accent)" }}>
                {s.n}
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--hontley-muted)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--hontley-gray)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Qué podemos automatizar</h2>
          <p className="text-center mb-10" style={{ color: "var(--hontley-muted)" }}>
            No se trata solo de responder mensajes. Se trata de diseñar procesos que le quiten fricción a tu operación.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {USE_CASES.map((uc) => (
              <div
                key={uc.label}
                className="rounded-xl p-5 space-y-1"
                style={{ background: "var(--background)", border: "1px solid var(--hontley-border)" }}
              >
                <div className="text-2xl">{uc.emoji}</div>
                <div className="font-semibold text-sm">{uc.label}</div>
                <div className="text-xs" style={{ color: "var(--hontley-muted)" }}>{uc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Estructura de inversión</h2>
        <p className="text-center mb-2" style={{ color: "var(--hontley-muted)" }}>
          Precios pensados para Colombia, con implementación en COP y costos variables fuera del fee fijo.
        </p>
        <p className="text-center text-sm mb-10" style={{ color: "var(--hontley-muted)" }}>
          La infraestructura, herramientas y consumo se pagan aparte, idealmente a nombre del cliente.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                border: p.highlight ? "2px solid var(--hontley-accent)" : "1px solid var(--hontley-border)",
                background: p.highlight ? "var(--hontley-gray)" : "var(--background)",
              }}
            >
              {p.highlight && (
                <div
                  className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full self-start"
                  style={{ background: "var(--hontley-accent)", color: "#fff" }}
                >
                  Más popular
                </div>
              )}
              <div>
                <div className="text-lg font-bold">{p.name}</div>
                <div className="text-3xl font-extrabold mt-1">{p.price}</div>
              </div>
              <ul className="space-y-2 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "var(--hontley-muted)" }}>
                    <span style={{ color: "var(--hontley-accent)" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={BOOKING_URL}
                className="text-center text-sm font-semibold py-2.5 rounded-lg transition"
                style={
                  p.highlight
                    ? { background: "var(--hontley-accent)", color: "#fff" }
                    : { border: "1px solid var(--hontley-border)", color: "var(--foreground)" }
                }
              >
                Cotizar
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-6" style={{ color: "var(--hontley-muted)" }}>
          Si quieres un paquete administrado, se puede cotizar mensual, pero con alcance y límites claros.
        </p>
      </section>

      <section className="py-16 text-center" style={{ background: "var(--hontley-accent)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Quieres automatizar procesos y canales en tu negocio?
          </h2>
          <p className="text-indigo-200 mb-8">
            Escríbele a Pacho y te mostramos qué se puede automatizar, cómo montarlo y cuánto costaría.
          </p>
          <a
            href={BOOKING_URL}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-base transition hover:brightness-110"
            style={{ background: "#fff", color: "var(--hontley-accent)" }}
          >
            Hablar por WhatsApp →
          </a>
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-sm flex-wrap gap-4" style={{ color: "var(--hontley-muted)" }}>
        <span className="font-bold text-lg" style={{ color: "var(--hontley-black)", letterSpacing: "-0.03em" }}>Hontley</span>
        <span>© {new Date().getFullYear()} Hontley. Todos los derechos reservados.</span>
        <a href={BOOKING_URL} className="hover:underline">{CONTACT_LABEL}</a>
      </footer>
    </main>
  );
}
