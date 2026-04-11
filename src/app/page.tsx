"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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

const HERO_POINTS = ["Atención", "Leads", "Reservas", "Soporte", "Seguimiento"];

const DEMO_SHOWCASE = [
  {
    title: "Operación y procesos",
    desc: "Mostrar cómo un flujo aterriza tareas, seguimiento y coordinación del equipo.",
    tag: "Demo recomendada",
  },
  {
    title: "CRM y pipeline",
    desc: "Enseñar cómo entran leads, se califican y se mueven al siguiente paso sin fricción.",
    tag: "Video de referencia",
  },
  {
    title: "Chat y atención",
    desc: "Dejar claro cómo responde, filtra y escala conversaciones en distintos canales.",
    tag: "Visual rápido",
  },
];

type DemoKey = "restaurante" | "inmobiliaria" | "clinica";

type KnowledgeDoc = {
  title: string;
  text: string;
  keywords: string[];
};

type DemoConfig = {
  label: string;
  badge: string;
  intro: string;
  placeholder: string;
  questions: string[];
  docs: KnowledgeDoc[];
  fallback: string;
};

const DEMOS: Record<DemoKey, DemoConfig> = {
  restaurante: {
    label: "Restaurante",
    badge: "🍽️ Atención + pedidos",
    intro: "Ideal para reservas, domicilios, menú del día y preguntas frecuentes.",
    placeholder: "Ej: La Cocina de Pacho",
    questions: [
      "¿Cuál es el menú de hoy?",
      "¿Hacen domicilios en esta zona?",
      "Quiero reservar para 4 personas hoy a las 8 pm",
    ],
    docs: [
      {
        title: "Menú y atención",
        text: "El restaurante ofrece menú ejecutivo, opciones a la carta, atención por chat, preguntas sobre ingredientes, horarios y recomendaciones según el cliente.",
        keywords: ["menu", "carta", "platos", "almuerzo", "comida", "ingredientes"],
      },
      {
        title: "Domicilios y cobertura",
        text: "Los domicilios se confirman según zona de cobertura, horario y volumen de pedidos. Se puede pedir ubicación, barrio y tiempo estimado de entrega antes de confirmar.",
        keywords: ["domicilio", "envio", "zona", "cobertura", "barrio", "entrega"],
      },
      {
        title: "Reservas",
        text: "Las reservas piden nombre, número de contacto, cantidad de personas, fecha y hora. Luego se confirma disponibilidad y se envía mensaje de confirmación.",
        keywords: ["reserva", "mesa", "personas", "hora", "agendar", "booking"],
      },
    ],
    fallback: "Puedo ayudarte con menú, domicilios, reservas o preguntas frecuentes. Si quieres, prueba una pregunta más concreta y te muestro cómo respondería el sistema.",
  },
  inmobiliaria: {
    label: "Inmobiliaria",
    badge: "🏡 Leads + agenda",
    intro: "Útil para filtrar prospectos, responder dudas y agendar visitas.",
    placeholder: "Ej: Inmobiliaria Medellín Norte",
    questions: [
      "Busco apartamento en arriendo en Medellín",
      "¿Qué documentos necesito para arrendar?",
      "Quiero agendar una visita esta semana",
    ],
    docs: [
      {
        title: "Búsqueda de inmuebles",
        text: "Para recomendar inmuebles conviene preguntar ciudad, zona, presupuesto, número de habitaciones y si busca arriendo o compra. Luego se filtran opciones y se comparte el siguiente paso.",
        keywords: ["apartamento", "casa", "arriendo", "compra", "medellin", "zona", "presupuesto"],
      },
      {
        title: "Documentos",
        text: "El proceso de arrendamiento normalmente pide documento, soportes de ingresos, datos de codeudor o respaldo y validación del perfil del interesado.",
        keywords: ["documentos", "requisitos", "papeles", "arrendar", "codeudor", "ingresos"],
      },
      {
        title: "Agenda de visitas",
        text: "Para agendar visitas se pide el inmueble de interés o necesidad del cliente, horarios disponibles y datos de contacto para confirmación.",
        keywords: ["visita", "agendar", "cita", "horario", "inmueble", "ver"],
      },
    ],
    fallback: "Puedo ayudarte con búsqueda de inmuebles, requisitos o agendamiento de visitas. Hazme una pregunta puntual y te muestro cómo respondería el demo.",
  },
  clinica: {
    label: "Clínica estética",
    badge: "✨ Agenda + información",
    intro: "Buena para resolver dudas, captar prospectos y reservar valoraciones.",
    placeholder: "Ej: Clínica Aura",
    questions: [
      "¿Qué tratamientos tienen para rejuvenecimiento facial?",
      "¿Cuánto cuesta una valoración?",
      "Quiero agendar una cita para este sábado",
    ],
    docs: [
      {
        title: "Tratamientos",
        text: "La clínica atiende preguntas sobre tratamientos faciales, corporales y valoración inicial. El sistema orienta sin diagnosticar y dirige hacia una valoración profesional.",
        keywords: ["tratamiento", "facial", "corporal", "rejuvenecimiento", "botox", "piel"],
      },
      {
        title: "Valoraciones y costos",
        text: "Las valoraciones pueden tener costo según servicio, agenda y disponibilidad. Lo ideal es tomar datos del prospecto y confirmar el valor según el caso.",
        keywords: ["precio", "costo", "valoracion", "cuanto", "tarifa", "consulta"],
      },
      {
        title: "Agenda",
        text: "Para agendar cita se debe pedir nombre completo, número de contacto, tratamiento de interés y horario preferido para confirmar disponibilidad.",
        keywords: ["agendar", "cita", "sabado", "horario", "reserva", "valoracion"],
      },
    ],
    fallback: "Puedo ayudarte con tratamientos, valoraciones o agenda. Pregúntame algo concreto y te muestro cómo respondería el demo.",
  },
};

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

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

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

function retrieveAnswer(question: string, config: DemoConfig, name: string, business: string) {
  const normalizedQuestion = normalize(question);
  const scoredDocs = config.docs
    .map((doc) => {
      const keywordHits = doc.keywords.reduce((acc, keyword) => {
        const normalizedKeyword = normalize(keyword);
        return acc + (normalizedQuestion.includes(normalizedKeyword) ? 2 : 0);
      }, 0);

      const textHits = normalize(doc.text)
        .split(/\s+/)
        .filter((word) => word.length > 3 && normalizedQuestion.includes(word)).length;

      return { doc, score: keywordHits + textHits };
    })
    .sort((a, b) => b.score - a.score);

  const best = scoredDocs[0];
  const businessName = business || "tu negocio";
  const userName = name ? `${name}, ` : "";

  if (!best || best.score <= 0) {
    return `Hola ${userName}soy el asistente de ${businessName}. ${config.fallback}`;
  }

  return `Hola ${userName}soy el asistente de ${businessName}. ${best.doc.text}`;
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [demoType, setDemoType] = useState<DemoKey>("restaurante");
  const [demoName, setDemoName] = useState("");
  const [demoBusiness, setDemoBusiness] = useState("");
  const [demoInput, setDemoInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

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

  const demoConfig = DEMOS[demoType];

  useEffect(() => {
    setChatMessages([]);
    setDemoInput("");
  }, [demoType]);

  const whatsappHref = useMemo(() => {
    const business = demoBusiness.trim() || "mi negocio";
    const label = DEMOS[demoType].label.toLowerCase();
    return `https://wa.me/573106460010?text=${encodeURIComponent(
      `Hola Pacho, acabo de probar el demo de ${label} para ${business} y quiero cotizar una automatización para mi negocio.`
    )}`;
  }, [demoBusiness, demoType]);

  const submitQuestion = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    const answer = retrieveAnswer(cleanQuestion, demoConfig, demoName.trim(), demoBusiness.trim());

    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: cleanQuestion },
      { role: "assistant", text: answer },
    ]);
    setDemoInput("");
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

      <section className="max-w-6xl mx-auto px-6 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <div
              className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-5"
              style={{ background: "var(--hontley-gray)", color: "var(--hontley-accent)" }}
            >
              🇨🇴 Automatización para negocios en Colombia
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-5">
              Automatiza atención,<br />
              ventas y operación.
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mb-6" style={{ color: "var(--hontley-muted)" }}>
              Un sistema que responde, organiza y da seguimiento por ti.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {HERO_POINTS.map((point) => (
                <span
                  key={point}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: "var(--hontley-gray)", border: "1px solid var(--hontley-border)" }}
                >
                  {point}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-base transition hover:brightness-110"
                style={{ background: "var(--hontley-accent)", color: "#fff" }}
              >
                Probar demo ahora →
              </a>
              <a
                href={BOOKING_URL}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-base transition"
                style={{ border: "1px solid var(--hontley-border)", color: "var(--hontley-muted)" }}
              >
                Hablar con Pacho
              </a>
            </div>
          </div>

          <div className="rounded-[28px] p-5 sm:p-6" style={{ background: "linear-gradient(180deg, var(--hontley-gray), transparent)", border: "1px solid var(--hontley-border)" }}>
            <div className="rounded-2xl p-4 mb-4" style={{ background: "var(--background)", border: "1px solid var(--hontley-border)" }}>
              <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--hontley-accent)" }}>
                Lo entiendes en segundos
              </div>
              <div className="space-y-3 text-sm">
                <div className="rounded-xl px-4 py-3" style={{ background: "var(--hontley-gray)" }}>Responde mensajes y preguntas frecuentes</div>
                <div className="rounded-xl px-4 py-3" style={{ background: "var(--hontley-gray)" }}>Captura leads, pedidos o solicitudes</div>
                <div className="rounded-xl px-4 py-3" style={{ background: "var(--hontley-gray)" }}>Organiza el siguiente paso sin perseguir a nadie</div>
              </div>
            </div>
            <div className="rounded-2xl p-4" style={{ background: "var(--background)", border: "1px solid var(--hontley-border)" }}>
              <div className="text-sm font-semibold mb-3">Así se vería en tu negocio</div>
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm" style={{ background: "var(--hontley-accent)", color: "#fff" }}>
                    Hola, quiero cotizar y saber si tienen agenda esta semana.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl px-4 py-3 text-sm" style={{ background: "var(--hontley-gray)", border: "1px solid var(--hontley-border)" }}>
                    Sí. Te ayudo con eso ahora mismo. Primero dime qué servicio necesitas y te comparto disponibilidad, precio estimado y siguiente paso.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_SHOWCASE.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-5"
              style={{ background: "var(--hontley-gray)", border: "1px solid var(--hontley-border)" }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--hontley-accent)" }}>
                {item.tag}
              </div>
              <div className="aspect-video rounded-xl mb-4 flex items-center justify-center text-sm text-center px-4" style={{ background: "var(--background)", border: "1px dashed var(--hontley-border)", color: "var(--hontley-muted)" }}>
                Aquí puede ir un video corto o demo visual de referencia
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm" style={{ color: "var(--hontley-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="demo" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-[28px] p-6 sm:p-8" style={{ background: "var(--hontley-gray)", border: "1px solid var(--hontley-border)" }}>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div
              className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-4"
              style={{ background: "var(--background)", color: "var(--hontley-accent)" }}
            >
              Demo interactivo con base de conocimiento
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Haz preguntas reales y mira cómo respondería el sistema</h2>
            <p style={{ color: "var(--hontley-muted)" }}>
              Esto ya no es solo un mock. El demo busca respuestas dentro de una mini base de conocimiento por vertical para que se sienta más aterrizado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.2fr] gap-6 items-start">
            <div className="rounded-2xl p-5 sm:p-6" style={{ background: "var(--background)", border: "1px solid var(--hontley-border)" }}>
              <h3 className="text-xl font-bold mb-4">Configura tu demo</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Tipo de negocio</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(Object.entries(DEMOS) as [DemoKey, DemoConfig][]).map(([key, demo]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setDemoType(key)}
                        className="rounded-xl px-3 py-3 text-left text-sm font-medium transition"
                        style={{
                          background: demoType === key ? "var(--hontley-accent)" : "var(--hontley-gray)",
                          color: demoType === key ? "#fff" : "var(--foreground)",
                          border: demoType === key ? "1px solid var(--hontley-accent)" : "1px solid var(--hontley-border)",
                        }}
                      >
                        <div>{demo.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="demo-name" className="text-sm font-medium block mb-2">Tu nombre</label>
                  <input
                    id="demo-name"
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    placeholder="Ej: Sebastián"
                    className="w-full rounded-xl px-4 py-3 outline-none"
                    style={{ background: "var(--hontley-gray)", border: "1px solid var(--hontley-border)" }}
                  />
                </div>

                <div>
                  <label htmlFor="demo-business" className="text-sm font-medium block mb-2">Nombre de tu negocio</label>
                  <input
                    id="demo-business"
                    value={demoBusiness}
                    onChange={(e) => setDemoBusiness(e.target.value)}
                    placeholder={demoConfig.placeholder}
                    className="w-full rounded-xl px-4 py-3 outline-none"
                    style={{ background: "var(--hontley-gray)", border: "1px solid var(--hontley-border)" }}
                  />
                </div>

                <div className="rounded-2xl p-4" style={{ background: "var(--hontley-gray)", border: "1px solid var(--hontley-border)" }}>
                  <div className="text-sm font-semibold mb-1">{demoConfig.badge}</div>
                  <p className="text-sm" style={{ color: "var(--hontley-muted)" }}>{demoConfig.intro}</p>
                </div>

                <a
                  href={whatsappHref}
                  className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl font-semibold transition hover:brightness-110"
                  style={{ background: "var(--hontley-accent)", color: "#fff" }}
                >
                  Quiero uno así para mi negocio →
                </a>
              </div>
            </div>

            <div className="rounded-2xl p-5 sm:p-6" style={{ background: "var(--background)", border: "1px solid var(--hontley-border)" }}>
              <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
                <div>
                  <h3 className="text-xl font-bold">Chat demo</h3>
                  <p className="text-sm" style={{ color: "var(--hontley-muted)" }}>Puedes usar preguntas sugeridas o escribir la tuya.</p>
                </div>
                <div className="text-xs px-3 py-1 rounded-full" style={{ background: "var(--hontley-gray)", color: "var(--hontley-accent)" }}>
                  Mini RAG local MVP
                </div>
              </div>

              <div className="rounded-2xl p-4 mb-4" style={{ background: "var(--hontley-gray)", border: "1px solid var(--hontley-border)" }}>
                <div className="text-sm font-semibold mb-1">
                  {demoBusiness.trim() || demoConfig.label} Assistant
                </div>
                <p className="text-sm" style={{ color: "var(--hontley-muted)" }}>
                  Hola {demoName.trim() || ""}{demoName.trim() ? "," : ""} esta demo responde buscando información dentro de una base de conocimiento simple por vertical.
                </p>
              </div>

              <div className="space-y-3 mb-4">
                {demoConfig.questions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => submitQuestion(question)}
                    className="w-full text-left rounded-2xl px-4 py-3 transition"
                    style={{
                      background: "var(--hontley-gray)",
                      color: "var(--foreground)",
                      border: "1px solid var(--hontley-border)",
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 mb-5">
                <input
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submitQuestion(demoInput);
                    }
                  }}
                  placeholder="Escribe una pregunta como lo haría un cliente"
                  className="flex-1 rounded-xl px-4 py-3 outline-none"
                  style={{ background: "var(--hontley-gray)", border: "1px solid var(--hontley-border)" }}
                />
                <button
                  type="button"
                  onClick={() => submitQuestion(demoInput)}
                  className="px-4 py-3 rounded-xl font-semibold"
                  style={{ background: "var(--hontley-accent)", color: "#fff" }}
                >
                  Enviar
                </button>
              </div>

              <div className="space-y-4 min-h-[260px]">
                {chatMessages.length > 0 ? (
                  chatMessages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className="max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                        style={
                          message.role === "user"
                            ? { background: "var(--hontley-accent)", color: "#fff" }
                            : { background: "var(--hontley-gray)", color: "var(--foreground)", border: "1px solid var(--hontley-border)" }
                        }
                      >
                        {message.text}
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="h-full rounded-2xl p-5 text-sm flex items-center justify-center text-center"
                    style={{ background: "var(--hontley-gray)", color: "var(--hontley-muted)", border: "1px dashed var(--hontley-border)" }}
                  >
                    Haz una pregunta sugerida o escribe la tuya. El demo buscará la mejor respuesta dentro de una mini base de conocimiento por vertical.
                  </div>
                )}
              </div>
            </div>
          </div>
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
            href={whatsappHref}
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
