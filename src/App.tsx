import { useState, useEffect } from "react";
import {
  NAVY, NAVY_DARK, GREEN, GREEN_BG, YELLOW, YELLOW_BG, RED, RED_BG, GRAY_TEXT,
  masterData, semaphoreData, semColors, rankingData, unitsData, actionPlanData,
} from "./data";

const sections = [
  { id: "cover", label: "Portada", icon: "fa-home" },
  { id: "resumen", label: "Resumen Ejecutivo", icon: "fa-file-alt" },
  { id: "metodologia", label: "Metodología", icon: "fa-cogs" },
  { id: "tabla-maestra", label: "Tabla Maestra", icon: "fa-table" },
  { id: "semaforo", label: "Semáforo y Ranking", icon: "fa-traffic-light" },
  { id: "analisis", label: "Análisis por Unidad", icon: "fa-users" },
  { id: "hallazgos", label: "Hallazgos Transversales", icon: "fa-lightbulb" },
  { id: "plan", label: "Plan de Acción", icon: "fa-tasks" },
  { id: "conclusiones", label: "Conclusiones", icon: "fa-check-circle" },
];

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

function StatCard({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200 hover:shadow-md transition-shadow">
      <div className="text-2xl md:text-3xl font-bold font-serif" style={{ color: accent }}>{value}</div>
      <div className="text-xs md:text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function SectionTitle({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h1 id={id} className="text-2xl md:text-3xl font-bold font-serif text-[#1E2761] border-b-4 border-[#1E2761] pb-2 mb-6 scroll-mt-20">
      {children}
    </h1>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl md:text-2xl font-bold font-serif text-[#14193F] mt-8 mb-4">{children}</h2>;
}

function Bullet({ children, bold }: { children: React.ReactNode; bold?: boolean }) {
  return (
    <li className="flex items-start gap-2 mb-2 text-slate-700 leading-relaxed">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1E2761] shrink-0" />
      <span className={bold ? "font-semibold text-slate-800" : ""}>{children}</span>
    </li>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("cover");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar Navigation - Desktop */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#1E2761] to-[#14193F] text-white flex-col z-50 shadow-xl">
        <div className="p-5 border-b border-white/10">
          <div className="text-xs uppercase tracking-widest text-blue-200 mb-1">Informe Gerencial</div>
          <div className="text-sm font-semibold text-white/90">Desempeño de Unidades</div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`w-full text-left px-5 py-2.5 text-sm flex items-center gap-3 transition-all ${
                activeSection === s.id
                  ? "bg-white/15 text-white border-r-3 border-white"
                  : "text-blue-200 hover:bg-white/5 hover:text-white"
              }`}
            >
              <i className={`fas ${s.icon} w-4 text-center text-xs`} />
              {s.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-white/10 text-xs text-blue-300">
          <div>Corte del 12 del mes</div>
          <div className="mt-1">Meta: $350.000.000</div>
        </div>
      </nav>

      {/* Mobile Nav Toggle */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1E2761] text-white p-3 rounded-lg shadow-lg"
      >
        <i className={`fas ${mobileNavOpen ? "fa-times" : "fa-bars"}`} />
      </button>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileNavOpen(false)}>
          <nav className="w-72 h-full bg-[#1E2761] text-white overflow-y-auto pt-16" onClick={(e) => e.stopPropagation()}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-6 py-3 text-sm flex items-center gap-3 ${
                  activeSection === s.id ? "bg-white/15 text-white" : "text-blue-200"
                }`}
              >
                <i className={`fas ${s.icon} w-4 text-center text-xs`} />
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* COVER */}
        <section id="cover" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E2761] via-[#14193F] to-[#0d1030] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-400 blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-indigo-400 blur-3xl" />
          </div>
          <div className="relative text-center px-6 max-w-4xl mx-auto">
            <div className="text-xs uppercase tracking-[0.3em] text-blue-300 mb-6">Informe Gerencial</div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight">
              Análisis Comparativo de Desempeño de las Unidades de Supervisión
            </h1>
            <p className="text-lg md:text-xl text-blue-200 italic mb-8">
              Corte de barrido de cartera y resultado económico al 12 del mes
            </p>
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 mb-10">
              <div className="text-sm text-blue-200 mb-1">Meta de recaudo por unidad</div>
              <div className="text-2xl md:text-3xl font-bold">$350.000.000</div>
              <div className="text-sm text-blue-300 mt-1">POA Gerencia: $425.000.000</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-xs text-blue-300 uppercase tracking-wide">Unidades evaluadas</div>
                <div className="text-sm mt-1">Danny Rojas / Santiago · Karen Espinosa · Laura Candela · Jhon Staper</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-xs text-blue-300 uppercase tracking-wide">Fuentes</div>
                <div className="text-sm mt-1">Reporte de barrido de cartera + Reporte económico consolidado</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-xs text-blue-300 uppercase tracking-wide">Cartera total gestionada</div>
                <div className="text-sm mt-1">49.182 clientes · $112,7 mil millones de saldo</div>
              </div>
            </div>
          </div>
        </section>

        {/* RESUMEN EJECUTIVO */}
        <section id="resumen" className="py-16 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
          <SectionTitle id="resumen">1. Resumen ejecutivo</SectionTitle>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              Este informe consolida dos fuentes de información del mes en curso — el reporte operativo de barrido de cartera y el reporte económico de recaudo — para construir una lectura integral del desempeño de las cuatro unidades de supervisión frente a la meta de $350.000.000 por unidad. Se confirmó con el equipo que la unidad identificada como "Danny Rojas" en el reporte económico corresponde a la misma unidad registrada como "Santiago" en el reporte de barrido; en adelante se presenta como Danny / Santiago.
            </p>
            <p>
              Ninguna de las cuatro unidades ha alcanzado todavía la meta mensual: el mayor avance registrado es 21,65%. Sin embargo, el análisis muestra que el resultado de recaudo no depende de un único comportamiento, sino de una combinación de cuatro variables que se mueven de forma distinta en cada equipo: cobertura de la cartera (barrido), calidad de las promesas obtenidas, capacidad de conversión de la gestión en pago, y productividad por cliente contactado.
            </p>
            <p className="font-semibold text-slate-800">Bajo una metodología de calificación ponderada (ver sección 2.4), el orden de desempeño integral resultante es:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {rankingData.map((r, i) => {
              const colors = [NAVY, "#2C6E9E", YELLOW, RED];
              return (
                <div key={i} className="rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold font-serif" style={{ color: colors[i] }}>{r.position}</span>
                    <span className="font-bold text-slate-800">{r.unit}</span>
                    <span className="ml-auto text-xl font-bold" style={{ color: colors[i] }}>{r.score}<span className="text-sm text-slate-400">/100</span></span>
                  </div>
                  <ProgressBar value={parseFloat(r.score.replace(",", "."))} max={100} color={colors[i]} />
                  <p className="text-sm text-slate-600 mt-3">{r.fortaleza}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-8">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong className="text-[#1E2761]">Recomendación central:</strong> No gestionar a las cuatro unidades con la misma instrucción. Cada una requiere una palanca distinta: a Laura se le debe exigir conversión y control de promesas rotas; a Karen, mayor cobertura sin sacrificar calidad; a Jhon, escalar volumen de gestión manteniendo su productividad; y a Danny/Santiago, sostener el equilibrio actual y acelerar el ritmo de cierre.
            </p>
          </div>
        </section>

        {/* METODOLOGÍA */}
        <section id="metodologia" className="py-16 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto bg-slate-50">
          <SectionTitle id="metodologia">2. Metodología y fuentes</SectionTitle>
          
          <SubTitle>2.1 Fuentes de datos</SubTitle>
          <ul className="space-y-2">
            <Bullet>Reporte de barrido de cartera del mes, con corte por unidad (Karen, Laura, Jhon, Santiago), que incluye clientes barridos vs. no barridos, saldo intervenido, valor de promesa generado y distribución por efecto de gestión.</Bullet>
            <Bullet>Reporte económico consolidado, con corte por unidad (Danny Rojas, Karen Espinosa, Laura Candela, Jhon Staper), que incluye saldo capital, recaudo acumulado, límite inferior (meta de $350 M), POA de Gerencia ($425 M), promesas de pago y rotas en valor, y expectativa de recaudo.</Bullet>
          </ul>

          <SubTitle>2.2 Nota sobre identidad de unidades</SubTitle>
          <p className="text-slate-700 leading-relaxed">
            El reporte económico identifica una unidad como "Danny Rojas" que no aparece en el reporte de barrido; este último identifica una cuarta unidad como "Santiago" que no aparece en el reporte económico. Se confirmó que ambas etiquetas corresponden a la misma unidad de supervisión. Este informe la presenta de forma unificada como "Danny / Santiago".
          </p>

          <SubTitle>2.3 Indicadores calculados</SubTitle>
          <p className="text-slate-700 leading-relaxed mb-3">Además de los indicadores que entregan los reportes de forma directa, se calcularon los siguientes indicadores analíticos:</p>
          <ul className="space-y-2">
            <Bullet>% cumplimiento de meta = Recaudo actual / $350.000.000.</Bullet>
            <Bullet>Calidad de la promesa = Promesas de pago (valor) / (Promesas de pago + Promesas rotas), en valor.</Bullet>
            <Bullet>Promesa rota sobre promesa de pago = Promesas rotas (valor) / Promesas de pago (valor).</Bullet>
            <Bullet>Promesa promedio por cliente barrido = Valor de promesa generado / Número de clientes barridos.</Bullet>
            <Bullet>Expectativa de recaudo sobre meta = Expectativa de recaudo reportada / $350.000.000.</Bullet>
          </ul>

          <SubTitle>2.4 Ranking integral</SubTitle>
          <p className="text-slate-700 leading-relaxed mb-4">Calificación comparativa (0 a 100, relativa entre las cuatro unidades) con la siguiente ponderación:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "% cumplimiento de meta", weight: "30%", color: NAVY },
              { label: "% meta cubierta por expectativa", weight: "20%", color: "#2C6E9E" },
              { label: "% cobertura de clientes", weight: "15%", color: GREEN },
              { label: "% cobertura de saldo", weight: "15%", color: YELLOW },
              { label: "Calidad de la promesa", weight: "10%", color: "#8B5CF6" },
              { label: "Productividad (promesa promedio)", weight: "10%", color: RED },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-slate-200">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: item.color }}>
                  {item.weight}
                </div>
                <span className="text-sm text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 italic mt-4">
            Cada variable se normalizó entre 0 y 100 tomando como referencia el mejor y el peor valor observado entre las cuatro unidades en este corte; por tanto, la calificación mide posición relativa dentro del grupo evaluado.
          </p>
        </section>

        {/* TABLA MAESTRA */}
        <section id="tabla-maestra" className="py-16 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
          <SectionTitle id="tabla-maestra">3. Tabla maestra comparativa</SectionTitle>
          <p className="text-sm text-slate-500 italic mb-6">Consolidación de los indicadores operativos (barrido) y económicos (recaudo) de las cuatro unidades en el corte analizado.</p>
          
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1E2761] text-white">
                  {masterData.headers.map((h, i) => (
                    <th key={i} className={`px-3 py-3 text-center font-semibold ${i === 0 ? "text-left" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {masterData.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-3 py-2.5 font-medium text-slate-700 text-left border-r border-slate-100 bg-slate-50/50">{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className="px-3 py-2.5 text-center text-slate-600">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2 italic">M = millones de pesos.</p>
        </section>

        {/* SEMÁFORO Y RANKING */}
        <section id="semaforo" className="py-16 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto bg-slate-50">
          <SectionTitle id="semaforo">4. Semáforo de gestión y ranking integral</SectionTitle>
          
          <SubTitle>4.1 Semáforo comparativo</SubTitle>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1E2761] text-white">
                  <th className="px-3 py-3 text-left font-semibold">Unidad</th>
                  <th className="px-3 py-3 text-center font-semibold">Ejecución operativa</th>
                  <th className="px-3 py-3 text-center font-semibold">Conversión económica</th>
                  <th className="px-3 py-3 text-center font-semibold">Calidad compromisos</th>
                  <th className="px-3 py-3 text-center font-semibold">Resultado recaudo</th>
                  <th className="px-3 py-3 text-center font-semibold">Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {semaphoreData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-3 py-3 font-medium text-slate-800 border-r border-slate-100">{row.unit}</td>
                    {[row.ejecucion, row.conversion, row.calidad, row.resultado].map((val, j) => {
                      const c = semColors[val] || { bg: "white", text: "inherit" };
                      return (
                        <td key={j} className="px-3 py-3 text-center">
                          <span className="inline-block px-2 py-1 rounded-md text-xs font-bold" style={{ backgroundColor: c.bg, color: c.text }}>
                            {val}
                          </span>
                        </td>
                      );
                    })}
                    <td className="px-3 py-3 text-center text-xs text-slate-600">{row.prioridad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubTitle>4.2 Ranking integral de desempeño</SubTitle>
          <p className="text-sm text-slate-500 italic mb-4">Calificación ponderada según la metodología descrita en la sección 2.4. El puntaje es relativo entre las cuatro unidades de este corte.</p>
          
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1E2761] text-white">
                  <th className="px-3 py-3 text-center font-semibold">Pos.</th>
                  <th className="px-3 py-3 text-left font-semibold">Unidad</th>
                  <th className="px-3 py-3 text-center font-semibold">Puntaje /100</th>
                  <th className="px-3 py-3 text-left font-semibold">Fortaleza principal</th>
                  <th className="px-3 py-3 text-left font-semibold">Brecha principal</th>
                </tr>
              </thead>
              <tbody>
                {rankingData.map((row, i) => {
                  const colors = [NAVY, "#2C6E9E", YELLOW, RED];
                  return (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-3 py-3 text-center font-bold text-white" style={{ backgroundColor: colors[i] }}>{row.position}</td>
                      <td className="px-3 py-3 font-medium text-slate-800">{row.unit}</td>
                      <td className="px-3 py-3 text-center font-bold" style={{ color: colors[i] }}>{row.score}</td>
                      <td className="px-3 py-3 text-left text-slate-600">{row.fortaleza}</td>
                      <td className="px-3 py-3 text-left text-slate-600">{row.brecha}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ANÁLISIS POR UNIDAD */}
        <section id="analisis" className="py-16 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
          <SectionTitle id="analisis">5. Análisis detallado por unidad de supervisión</SectionTitle>
          
          <div className="space-y-12">
            {unitsData.map((unit, idx) => (
              <div key={idx} className="rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: unit.accent + "40" }}>
                <div className="p-6 md:p-8" style={{ backgroundColor: unit.accent + "08" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: unit.accent }} />
                    <h3 className="text-xl md:text-2xl font-bold font-serif" style={{ color: unit.accent }}>{unit.name}</h3>
                  </div>
                  <p className="text-slate-500 italic ml-6">{unit.subtitle}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                    {unit.stats.map((s, i) => (
                      <StatCard key={i} value={s.value} label={s.label} accent={unit.accent} />
                    ))}
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-sm mb-3" style={{ color: GREEN }}>
                        <i className="fas fa-arrow-up" /> Aspectos positivos
                      </h4>
                      <ul className="space-y-2">
                        {unit.fortalezas.map((f, i) => <Bullet key={i}>{f}</Bullet>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-sm mb-3" style={{ color: RED }}>
                        <i className="fas fa-arrow-down" /> Aspectos de mejora
                      </h4>
                      <ul className="space-y-2">
                        {unit.mejoras.map((m, i) => <Bullet key={i}>{m}</Bullet>)}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl p-4 border-l-4" style={{ borderColor: unit.accent, backgroundColor: unit.accent + "08" }}>
                    <span className="font-bold text-sm" style={{ color: NAVY }}>Instrucción para el supervisor: </span>
                    <span className="text-sm text-slate-700 italic">{unit.instruccion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HALLAZGOS TRANSVERSALES */}
        <section id="hallazgos" className="py-16 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto bg-slate-50">
          <SectionTitle id="hallazgos">6. Hallazgos transversales</SectionTitle>

          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <SubTitle>6.1 El embudo de gestión es la variable que explica la brecha frente a la meta</SubTitle>
              <p className="text-slate-700 leading-relaxed mb-3">
                En las cuatro unidades, la proporción de clientes en "renuente" (entre 3.096 y 3.295 por unidad) y "no contesta" (entre 4.683 y 5.175 por unidad) supera ampliamente a los clientes con promesa de pago o en gestión activa. Esto significa que el cuello de botella no está únicamente en "hacer más barrido", sino en la efectividad del contacto.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-slate-700">
                  <strong>Recomendación:</strong> Medir el embudo completo — Cartera asignada → Barrido → Contacto efectivo → Intención → Promesa → Pago → Recuperación — como tablero estándar.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <SubTitle>6.2 El recaudo total no siempre refleja la salud de la gestión</SubTitle>
              <p className="text-slate-700 leading-relaxed">
                Danny/Santiago lidera el recaudo, pero Karen genera el mayor valor de promesas y la mejor calidad de compromiso con menor cobertura; Laura ejecuta el mayor volumen de barrido, pero con la mayor tasa de incumplimiento de promesas. Evaluar únicamente el recaudo acumulado sin observar cobertura, calidad de promesa y tasa de incumplimiento puede llevar a decisiones de gestión incompletas.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <SubTitle>6.3 Ninguna unidad está cerca de la meta de $350 millones</SubTitle>
              <p className="text-slate-700 leading-relaxed">
                El mejor avance del corte es 21,65 % (Danny/Santiago). Incluso proyectando la expectativa de recaudo reportada, la unidad más adelantada (Karen) alcanzaría apenas 53,2 % de la meta. Esto confirma que, más allá del orden entre supervisores, el reto principal de la operación es el volumen y ritmo de conversión de promesas a pago efectivo durante lo que resta del mes.
              </p>
            </div>
          </div>
        </section>

        {/* PLAN DE ACCIÓN */}
        <section id="plan" className="py-16 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
          <SectionTitle id="plan">7. Plan de acción por supervisor</SectionTitle>
          <p className="text-slate-700 leading-relaxed mb-6">
            La instrucción a cada unidad debe ser específica a su brecha real y no genérica ("gestionar más"). La siguiente matriz resume qué debe mantener, qué debe corregir, con qué indicador se hará seguimiento y qué meta de cierre se sugiere.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1E2761] text-white">
                  {actionPlanData.headers.map((h, i) => (
                    <th key={i} className={`px-3 py-3 font-semibold ${i === 0 ? "text-left" : "text-center"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {actionPlanData.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-3 py-3 ${j === 0 ? "font-medium text-slate-800 text-left" : "text-center text-slate-600"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubTitle>7.1 Indicador diario recomendado para el tablero de control</SubTitle>
          <p className="text-slate-700 leading-relaxed mb-4">
            Se recomienda instalar de forma inmediata un tablero diario con los siguientes cuatro campos por unidad, para pasar de "acumular promesas" a "convertir promesas en recaudo":
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "% de cumplimiento de la meta de $350 M",
              "Recaudo del día",
              "Promesas que vencen ese día",
              "Promesas rotas recuperadas ese día",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="w-8 h-8 rounded-full bg-[#1E2761] text-white flex items-center justify-center text-sm font-bold">{i + 1}</div>
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONCLUSIONES */}
        <section id="conclusiones" className="py-16 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto bg-slate-50">
          <SectionTitle id="conclusiones">8. Conclusiones</SectionTitle>
          
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              El corte analizado no muestra "un mejor supervisor" y "un peor supervisor" en términos absolutos, sino cuatro perfiles de desempeño con fortalezas y brechas distintas frente a una misma meta. <strong>Danny/Santiago</strong> logra hoy el mejor equilibrio entre operación y recaudo; <strong>Karen</strong> concentra la mejor calidad de negociación y el mayor potencial si logra escalar cobertura; <strong>Laura</strong> demuestra la mayor capacidad operativa del grupo, pero necesita resolver con urgencia la conversión de sus promesas en pago; y <strong>Jhon</strong> exhibe la mejor productividad individual por cliente gestionado, con el reto de escalar esa capacidad a mayor volumen.
            </p>
            <p>
              La recomendación gerencial es sostener este tipo de lectura integral —cruzando barrido, calidad de promesa y recaudo— como práctica mensual, y comunicar a cada supervisor una instrucción diferenciada basada en datos, evitando exigir la misma acción genérica a las cuatro unidades.
            </p>
          </div>

          <div className="mt-8 bg-gradient-to-r from-[#1E2761] to-[#14193F] rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <i className="fas fa-info-circle text-blue-300" />
              <span className="font-semibold">Nota</span>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed">
              Este informe se acompaña de una presentación de socialización para uso directo con los supervisores, con el detalle técnico de cada unidad y las instrucciones específicas de cierre de mes.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {unitsData.map((unit, i) => (
              <div key={i} className="rounded-xl p-4 text-center border-2 hover:shadow-md transition-shadow" style={{ borderColor: unit.accent + "40" }}>
                <div className="text-lg font-bold font-serif" style={{ color: unit.accent }}>{rankingData[i].score}</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">{unit.name.split(" / ")[0]}</div>
                <div className="text-xs text-slate-400">{unit.name.includes("/") ? "/ Santiago" : ""}</div>
                <div className="mt-2">
                  <ProgressBar value={parseFloat(rankingData[i].score.replace(",", "."))} max={100} color={unit.accent} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 text-center border-t border-slate-200 bg-white">
          <p className="text-sm text-slate-400">Informe Gerencial · Desempeño de Unidades de Supervisión</p>
          <p className="text-xs text-slate-300 mt-1">Corte al 12 del mes · Meta $350.000.000 · POA Gerencia $425.000.000</p>
        </footer>
      </main>
    </div>
  );
}
