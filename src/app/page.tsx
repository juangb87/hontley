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
  },
  {
    name: "Home Inspections Halley",
    logo: "/logo-halley.jpg",
    url: "https://homeinspectionshalley.com",
    industry: "Servicios inmobiliarios",
  },
  {
    name: "Bumbei",
    logo: "/logo-bumbei.jpg",
    url: "https://bumbei.com",
    industry: "Fintech",
  },
  {
    name: "Galeonica",
    logo: "/logo-galeonica.jpg",
    url: "https://galeonica.com",
    industry: "Fintech B2B",
  },
];

const BENEFITS = [
  {
    title: "Responde al instante",
    desc: "Atiende preguntas, solicitudes y mensajes sin dejar todo en visto.",
  },
  {
    title: "Filtra y organiza",
    desc: "Clasifica leads, pedidos o citas y mueve cada caso al siguiente paso.",
  },
  {
    title: "Le quita carga al equipo",
    desc: "Menos tareas repetitivas, más foco en cerrar y operar mejor.",
  },
];

const PLANS = [
  {
    name: "Base",
    price: "Desde COP 1.800.000",
  },
  {
    name: "Pro",
    price: "Desde COP 3.500.000",
  },
  {
    name: "Soporte mensual",
    price: "Desde COP 350.000/mes",
  },
];

type DemoKey = "restaurante" | "inmobiliaria" | "clinica";

type KnowledgeDoc = {
  text: string;
  keywords: string[];
};

type DemoConfig = {
  label: string;
  badge: string;
  placeholder: string;
  questions: string[];
  docs: KnowledgeDoc[];
  fallback: string;
};

const DEMOS: Record<DemoKey, DemoConfig> = {
  restaurante: {
    label: "Restaurante",
    badge: "🍽️ Pedidos y reservas",
    placeholder: "Ej: La Cocina de Pacho",
    questions: [
      "¿Cuál es el menú de hoy?",
      "¿Hacen domicilios en esta zona?",
      "Quiero reservar para 4 personas hoy a las 8 pm",
    ],
    docs: [
      {
        text: "El restaurante ofrece menú ejecutivo, opciones a la carta, atención por chat, preguntas sobre ingredientes, horarios y recomendaciones según el cliente.",
        keywords: ["menu", "carta", "platos", "almuerzo", "comida", "ingredientes"],
      },
      {
        text: "Los domicilios se confirman según zona de cobertura, horario y volumen de pedidos. Se puede pedir ubicación, barrio y tiempo estimado de entrega antes de confirmar.",
        keywords: ["domicilio", "envio", "zona", "cobertura", "barrio", "entrega"],
      },
      {
        text: "Las reservas piden nombre, número de contacto, cantidad de personas, fecha y hora. Luego se confirma disponibilidad y se envía mensaje de confirmación.",
        keywords: ["reserva", "mesa", "personas", "hora", "agendar", "booking"],
      },
    ],
    fallback: "Puedo ayudarte con menú, domicilios, reservas o preguntas frecuentes.",
  },
  inmobiliaria: {
    label: "Inmobiliaria",
    badge: "🏡 Leads y agenda",
    placeholder: "Ej: Inmobiliaria Medellín Norte",
    questions: [
      "Busco apartamento en arriendo en Medellín",
      "¿Qué documentos necesito para arrendar?",
      "Quiero agendar una visita esta semana",
    ],
    docs: [
      {
        text: "Para recomendar inmuebles conviene preguntar ciudad, zona, presupuesto, número de habitaciones y si busca arriendo o compra. Luego se filtran opciones y se comparte el siguiente paso.",
        keywords: ["apartamento", "casa", "arriendo", "compra", "medellin", "zona", "presupuesto"],
      },
      {
        text: "El proceso de arrendamiento normalmente pide documento, soportes de ingresos, datos de codeudor o respaldo y validación del perfil del interesado.",
        keywords: ["documentos", "requisitos", "papeles", "arrendar", "codeudor", "ingresos"],
      },
      {
        text: "Para agendar visitas se pide el inmueble de interés o necesidad del cliente, horarios disponibles y datos de contacto para confirmación.",
        keywords: ["visita", "agendar", "cita", "horario", "inmueble", "ver"],
      },
    ],
    fallback: "Puedo ayudarte con búsqueda de inmuebles, requisitos o visitas.",
  },
  clinica: {
    label: "Clínica estética",
    badge: "✨ Agenda y consultas",
    placeholder: "Ej: Clínica Aura",
    questions: [
      "¿Qué tratamientos tienen para rejuvenecimiento facial?",
      "¿Cuánto cuesta una valoración?",
      "Quiero agendar una cita para este sábado",
    ],
    docs: [
      {
        text: "La clínica atiende preguntas sobre tratamientos faciales, corporales y valoración inicial. El sistema orienta sin diagnosticar y dirige hacia una valoración profesional.",
        keywords: ["tratamiento", "facial", "corporal", "rejuvenecimiento", "botox", "piel"],
      },
      {
        text: "Las valoraciones pueden tener costo según servicio, agenda y disponibilidad. Lo ideal es tomar datos del prospecto y confirmar el valor según el caso.",
        keywords: ["precio", "costo", "valoracion", "cuanto", "tarifa", "consulta"],
      },
      {
        text: "Para agendar cita se debe pedir nombre completo, número de contacto, tratamiento de interés y horario preferido para confirmar disponibilidad.",
        keywords: ["agendar", "cita", "sabado", "horario", "reserva", "valoracion"],
      },
    ],
    fallback: "Puedo ayudarte con tratamientos, valoraciones o agenda.",
  },
};

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

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

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[28px] border backdrop-blur-xl ${className}`}
      style={{ background: "var(--hontley-panel)", borderColor: "var(--hontley-border)", boxShadow: "0 10px 50px rgba(0,0,0,0.25)" }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [demoType, setDemoType] = useState<DemoKey>("restaurante");
  const [demoName, setDemoName] = useState("");
  const [demoBusiness, setDemoBusiness] = useState("");
  const [demoInput, setDemoInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("hontley-dark", "true");
  }, []);

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
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-0 w-72 h-72 rounded-full blur-3xl opacity-35" style={{ background: "rgba(124,58,237,0.35)" }} />
        <div className="absolute top-12 right-0 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: "rgba(59,130,246,0.25)" }} />
      </div>

      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div>
          <span className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--hontley-black)", letterSpacing: "-0.04em" }}>
            Hontley
          </span>
          <div className="text-xs mt-1" style={{ color: "var(--hontley-muted)" }}>
            Sistemas de automatización para negocios
          </div>
        </div>
        <a
          href={BOOKING_URL}
          className="text-sm font-semibold px-4 py-2.5 rounded-xl transition relative z-10"
          style={{ background: "linear-gradient(135deg, var(--hontley-accent), var(--hontley-accent-light))", color: "#fff" }}
        >
          Hablar con Pacho
        </a>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-8 pb-12 relative z-10">
        <div className="max-w-3xl mb-8">
          <div
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-5"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(167,139,250,0.25)", color: "#ddd6fe" }}
          >
            <span>●</span>
            Automatización para negocios en Colombia
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95] mb-4">
            Un chat que responde,
            <br />
            <span style={{ color: "#c4b5fd" }}>organiza y da seguimiento.</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-6" style={{ color: "var(--hontley-muted)" }}>
            Pruébalo con tu negocio y mira cómo se vería una automatización real en segundos.
          </p>
        </div>

        <Panel className="p-5 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-6 items-start">
            <div className="rounded-3xl p-5 sm:p-6 border" style={{ background: "var(--hontley-panel-strong)", borderColor: "var(--hontley-border)" }}>
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
                        className="rounded-2xl px-3 py-3 text-left text-sm font-medium transition"
                        style={{
                          background: demoType === key ? "linear-gradient(135deg, var(--hontley-accent), var(--hontley-accent-light))" : "rgba(15,23,42,0.72)",
                          color: demoType === key ? "#fff" : "#e2e8f0",
                          border: demoType === key ? "1px solid rgba(167,139,250,0.42)" : "1px solid var(--hontley-border)",
                        }}
                      >
                        {demo.label}
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
                    className="w-full rounded-2xl px-4 py-3 outline-none"
                    style={{ background: "rgba(15,23,42,0.72)", border: "1px solid var(--hontley-border)" }}
                  />
                </div>

                <div>
                  <label htmlFor="demo-business" className="text-sm font-medium block mb-2">Nombre de tu negocio</label>
                  <input
                    id="demo-business"
                    value={demoBusiness}
                    onChange={(e) => setDemoBusiness(e.target.value)}
                    placeholder={demoConfig.placeholder}
                    className="w-full rounded-2xl px-4 py-3 outline-none"
                    style={{ background: "rgba(15,23,42,0.72)", border: "1px solid var(--hontley-border)" }}
                  />
                </div>

                <div className="rounded-2xl p-4" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(167,139,250,0.18)" }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: "#ddd6fe" }}>{demoConfig.badge}</div>
                  <p className="text-sm" style={{ color: "var(--hontley-muted)" }}>
                    Haz una pregunta sugerida o escribe la tuya.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {demoConfig.questions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => submitQuestion(question)}
                      className="w-full text-left rounded-2xl px-4 py-3 transition text-sm"
                      style={{ background: "rgba(15,23,42,0.72)", color: "#e2e8f0", border: "1px solid var(--hontley-border)" }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-5 sm:p-6 border" style={{ background: "var(--hontley-panel-strong)", borderColor: "var(--hontley-border)" }}>
              <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
                <div>
                  <h3 className="text-xl font-bold">Chat demo</h3>
                  <p className="text-sm" style={{ color: "var(--hontley-muted)" }}>
                    {demoBusiness.trim() || demoConfig.label} Assistant
                  </p>
                </div>
                <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.12)", color: "#ddd6fe" }}>
                  Demo en vivo
                </div>
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
                  className="flex-1 rounded-2xl px-4 py-3 outline-none"
                  style={{ background: "rgba(15,23,42,0.72)", border: "1px solid var(--hontley-border)" }}
                />
                <button
                  type="button"
                  onClick={() => submitQuestion(demoInput)}
                  className="px-4 py-3 rounded-2xl font-semibold"
                  style={{ background: "linear-gradient(135deg, var(--hontley-accent), var(--hontley-accent-light))", color: "#fff" }}
                >
                  Enviar
                </button>
              </div>

              <div className="space-y-4 min-h-[320px]">
                {chatMessages.length > 0 ? (
                  chatMessages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className="max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                        style={
                          message.role === "user"
                            ? { background: "linear-gradient(135deg, var(--hontley-accent), #5b21b6)", color: "#fff" }
                            : { background: "rgba(15,23,42,0.72)", color: "#e2e8f0", border: "1px solid var(--hontley-border)" }
                        }
                      >
                        {message.text}
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="h-full rounded-2xl p-5 text-sm flex items-center justify-center text-center"
                    style={{ background: "rgba(15,23,42,0.72)", color: "var(--hontley-muted)", border: "1px dashed var(--hontley-border)" }}
                  >
                    Prueba una pregunta y te mostramos cómo respondería el sistema con una mini base de conocimiento por vertical.
                  </div>
                )}
              </div>
            </div>
          </div>
        </Panel>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BENEFITS.map((item, index) => (
            <Panel key={item.title} className="p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: index === 0 ? "#c4b5fd" : index === 1 ? "#93c5fd" : "#a7f3d0" }}>
                Beneficio
              </div>
              <h3 className="font-bold mb-2 text-lg">{item.title}</h3>
              <p className="text-sm" style={{ color: "var(--hontley-muted)" }}>{item.desc}</p>
            </Panel>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10 relative z-10">
        <Panel className="p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Casos reales</h2>
              <p style={{ color: "var(--hontley-muted)" }}>Negocios donde ya hemos construido automatizaciones.</p>
            </div>
            <a href={BOOKING_URL} className="text-sm font-semibold hover:underline" style={{ color: "#ddd6fe" }}>
              Ver si aplica a mi negocio
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl p-4 transition"
                style={{ background: "rgba(15,23,42,0.6)", border: "1px solid var(--hontley-border)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Image src={p.logo} alt={p.name} width={40} height={40} className="rounded-xl object-cover" />
                  <div>
                    <div className="font-semibold group-hover:underline">{p.name}</div>
                    <div className="text-xs" style={{ color: "var(--hontley-muted)" }}>{p.industry}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Panel>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 relative z-10">
        <Panel className="p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Precios</h2>
              <p style={{ color: "var(--hontley-muted)" }}>Implementación en COP. Infra y consumo aparte.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((p, index) => (
              <div
                key={p.name}
                className="rounded-3xl p-5"
                style={{
                  border: index === 1 ? "1px solid rgba(167,139,250,0.42)" : "1px solid var(--hontley-border)",
                  background: index === 1 ? "rgba(124,58,237,0.08)" : "rgba(15,23,42,0.6)",
                }}
              >
                <div className="text-lg font-bold mb-2">{p.name}</div>
                <div className="text-3xl font-extrabold">{p.price}</div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20 relative z-10">
        <div className="rounded-[32px] p-8 sm:p-10 text-center border" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(59,130,246,0.12))", borderColor: "rgba(167,139,250,0.22)" }}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Quieres uno así para tu negocio?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: "#cbd5e1" }}>
            Escríbele a Pacho y te mostramos qué se puede automatizar y cuánto costaría montarlo.
          </p>
          <a
            href={whatsappHref}
            className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-base transition hover:brightness-110"
            style={{ background: "#fff", color: "#5b21b6" }}
          >
            Hablar por WhatsApp →
          </a>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm flex-wrap gap-4 relative z-10" style={{ color: "var(--hontley-muted)" }}>
        <span className="font-bold text-lg" style={{ color: "var(--hontley-black)", letterSpacing: "-0.03em" }}>Hontley</span>
        <span>© {new Date().getFullYear()} Hontley. Todos los derechos reservados.</span>
        <a href={BOOKING_URL} className="hover:underline">{CONTACT_LABEL}</a>
      </footer>
    </main>
  );
}
