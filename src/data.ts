// All report data extracted from the DOCX generation script

export const NAVY = "#1E2761";
export const NAVY_DARK = "#14193F";
export const ICE = "#CADCFC";
export const GREEN = "#1E8449";
export const GREEN_BG = "#E7F5EC";
export const YELLOW = "#B7791F";
export const YELLOW_BG = "#FDF3DD";
export const RED = "#B03A2E";
export const RED_BG = "#FBE8E5";
export const GRAY_TEXT = "#44546A";

export const masterData = {
  headers: ["Indicador", "Danny / Santiago", "Karen", "Laura", "Jhon"],
  rows: [
    ["Cartera total (clientes)", "12.273", "12.413", "12.260", "12.236"],
    ["Clientes barridos", "3.348", "2.812", "3.902", "3.017"],
    ["% cobertura de clientes", "27,28 %", "22,65 %", "31,83 %", "24,66 %"],
    ["Saldo barrido", "$9.385 M", "$10.726 M", "$13.773 M", "$10.109 M"],
    ["% cobertura de saldo", "33,31 %", "37,54 %", "49,26 %", "35,91 %"],
    ["Valor promesas sobre barrido", "$151,3 M", "$115,1 M", "$149,9 M", "$140,2 M"],
    ["Valor promesas sobre no barrido", "$63,1 M", "$102,1 M", "$64,0 M", "$60,1 M"],
    ["Valor total de promesas (barrido)", "$214,4 M", "$217,2 M", "$213,8 M", "$200,4 M"],
    ["Promesa promedio por cliente barrido", "$45.180", "$40.921", "$38.411", "$46.486"],
    ["Recaudo acumulado", "$75,76 M", "$69,05 M", "$63,62 M", "$59,80 M"],
    ["% cumplimiento de meta ($350 M)", "21,65 %", "19,73 %", "18,18 %", "17,09 %"],
    ["Faltante para la meta", "$274,24 M", "$280,95 M", "$286,38 M", "$290,20 M"],
    ["Pendiente sobre POA Gerencia ($425 M)", "$349,24 M", "$355,95 M", "$361,38 M", "$365,20 M"],
    ["Promesas de pago (valor)", "$133,88 M", "$160,62 M", "$118,05 M", "$120,40 M"],
    ["Promesas rotas (valor)", "$37,16 M", "$30,94 M", "$57,34 M", "$40,58 M"],
    ["Calidad de la promesa", "78,3 %", "83,9 %", "67,3 %", "74,8 %"],
    ["Promesa rota / promesa de pago", "27,8 %", "19,3 %", "48,6 %", "33,7 %"],
    ["Expectativa de recaudo", "$175,05 M", "$186,13 M", "$154,85 M", "$150,17 M"],
    ["Expectativa / meta", "50,0 %", "53,2 %", "44,2 %", "42,9 %"],
    ["Clientes en gestión", "1.710", "1.559", "1.616", "1.968"],
    ["Clientes renuentes", "3.096", "3.187", "3.213", "3.295"],
    ["Clientes que no contestan", "4.983", "5.175", "4.871", "4.683"],
  ],
};

export interface SemaphoreRow {
  unit: string;
  ejecucion: string;
  conversion: string;
  calidad: string;
  resultado: string;
  prioridad: string;
}

export const semaphoreData: SemaphoreRow[] = [
  { unit: "Danny / Santiago", ejecucion: "Buena", conversion: "Buena", calidad: "Buena", resultado: "Mejor del grupo", prioridad: "Sostener y acelerar cierre" },
  { unit: "Karen", ejecucion: "Débil", conversion: "Muy buena", calidad: "La mejor del grupo", resultado: "Bueno, con potencial", prioridad: "Aumentar cobertura" },
  { unit: "Laura", ejecucion: "La mejor del grupo", conversion: "Débil", calidad: "La más baja del grupo", resultado: "Regular", prioridad: "Convertir barrido en pago" },
  { unit: "Jhon", ejecucion: "Regular", conversion: "Regular", calidad: "Regular", resultado: "El más bajo del grupo", prioridad: "Escalar volumen de gestión" },
];

export const semColors: Record<string, { bg: string; text: string }> = {
  "Buena": { bg: GREEN_BG, text: GREEN },
  "Muy buena": { bg: GREEN_BG, text: GREEN },
  "La mejor del grupo": { bg: GREEN_BG, text: GREEN },
  "Mejor del grupo": { bg: GREEN_BG, text: GREEN },
  "Regular": { bg: YELLOW_BG, text: YELLOW },
  "Bueno, con potencial": { bg: YELLOW_BG, text: YELLOW },
  "Débil": { bg: RED_BG, text: RED },
  "La más baja del grupo": { bg: RED_BG, text: RED },
  "El más bajo del grupo": { bg: RED_BG, text: RED },
};

export interface RankingRow {
  position: string;
  unit: string;
  score: string;
  fortaleza: string;
  brecha: string;
}

export const rankingData: RankingRow[] = [
  { position: "1º", unit: "Danny / Santiago", score: "66,4", fortaleza: "Equilibrio entre gestión y recaudo real", brecha: "Acelerar volumen sin perder conversión" },
  { position: "2º", unit: "Karen", score: "54,5", fortaleza: "Calidad de negociación y expectativa de recaudo", brecha: "Cobertura de cartera todavía baja (22,65 %)" },
  { position: "3º", unit: "Laura", score: "39,8", fortaleza: "Mayor cobertura de clientes y de saldo del grupo", brecha: "Promesas rotas más altas del grupo (48,6 %)" },
  { position: "4º", unit: "Jhon", score: "20,3", fortaleza: "Mayor productividad por cliente barrido", brecha: "Menor escala de gestión y menor recaudo" },
];

export interface UnitData {
  name: string;
  subtitle: string;
  accent: string;
  stats: { value: string; label: string }[];
  fortalezas: string[];
  mejoras: string[];
  instruccion: string;
}

export const unitsData: UnitData[] = [
  {
    name: "Danny Rojas / Santiago",
    subtitle: "Mejor resultado integral del corte",
    accent: NAVY,
    stats: [
      { value: "21,65 %", label: "Cumplimiento de meta" },
      { value: "27,28 %", label: "Cobertura de clientes" },
      { value: "78,3 %", label: "Calidad de promesa" },
      { value: "1º / 4", label: "Ranking integral" },
    ],
    fortalezas: [
      "Mayor recaudo acumulado del grupo ($75,76 M) y mayor % de cumplimiento de la meta (21,65 %).",
      "Mejor equilibrio entre actividad de barrido (27,28 %, segunda cobertura del grupo), generación de promesas y conversión en recaudo real.",
      "Mayor valor de promesas generadas sobre la cartera efectivamente barrida ($151,3 M), y segunda mejor productividad por cliente barrido ($45.180).",
      "Calidad de promesa saludable (78,3 %) y proporción de promesa rota sobre promesa de pago controlada (27,8 %), por debajo del promedio del grupo.",
    ],
    mejoras: [
      "El saldo intervenido (33,31 %) es el más bajo del grupo en proporción; existe margen para dirigir el barrido hacia clientes de mayor saldo, no solo mayor número.",
      "Con 4.983 clientes en \"no contesta\", la unidad debe revisar estrategias de contacto alternativo para no perder terreno frente a Karen y Laura en ese frente.",
      "El recaudo diario reportado es 0 en el corte; se requiere verificar que el flujo de caja efectivamente se esté registrando en el periodo.",
    ],
    instruccion: "Mantener la disciplina de conversión que ya demuestra el equipo y acelerar el ritmo de cierre de promesas a pago; explorar una mejor priorización de cartera de alto saldo dentro del barrido.",
  },
  {
    name: "Karen Espinosa",
    subtitle: "Mayor potencial de conversión futura",
    accent: "#2C6E9E",
    stats: [
      { value: "19,73 %", label: "Cumplimiento de meta" },
      { value: "83,9 %", label: "Calidad de promesa (la mejor)" },
      { value: "22,65 %", label: "Cobertura de clientes (la más baja)" },
      { value: "2º / 4", label: "Ranking integral" },
    ],
    fortalezas: [
      "Mayor valor de promesas de pago del grupo ($160,62 M) y menor valor de promesas rotas ($30,94 M): la mejor calidad de compromiso del corte (83,9 %).",
      "Mayor expectativa de recaudo en valor absoluto ($186,13 M) y como % de la meta (53,2 %), la más alta de las cuatro unidades.",
      "Segundo mejor % de cumplimiento de meta (19,73 %) pese a tener la menor cobertura operativa, lo que indica una negociación muy efectiva sobre la cartera que sí gestiona.",
    ],
    mejoras: [
      "Menor cobertura de clientes barridos del grupo (22,65 %) y menor número de clientes barridos en términos absolutos (2.812).",
      "Mayor número de clientes en \"no contesta\" (5.175), el más alto de las cuatro unidades; es la principal barrera para escalar su buen desempeño de conversión.",
      "Una parte relevante de sus promesas ($102,1 M) proviene de cartera todavía no barrida, lo que debe monitorearse para que el resultado no dependa de gestión fuera del proceso estándar.",
    ],
    instruccion: "Aumentar la cobertura de barrido sin sacrificar la calidad de negociación que ya demuestra; priorizar la reducción de \"no contesta\" con canales de contacto complementarios.",
  },
  {
    name: "Laura Candela",
    subtitle: "Mayor actividad operativa, menor conversión",
    accent: RED,
    stats: [
      { value: "18,18 %", label: "Cumplimiento de meta" },
      { value: "31,83 %", label: "Cobertura de clientes (la mejor)" },
      { value: "48,6 %", label: "Promesa rota / promesa pago (la más alta)" },
      { value: "3º / 4", label: "Ranking integral" },
    ],
    fortalezas: [
      "Líder indiscutible en ejecución operativa: mayor número de clientes barridos (3.902), mayor % de cobertura de clientes (31,83 %) y mayor % de saldo intervenido (49,26 %) del grupo.",
      "Mayor saldo barrido en valor absoluto ($13.773 M), casi la mitad de toda su cartera asignada.",
      "Menor número de clientes en \"no contesta\" del grupo (4.871), lo que confirma buena capacidad de contacto efectivo.",
    ],
    mejoras: [
      "Mayor valor de promesas rotas del grupo ($57,34 M) y la peor relación promesa rota / promesa de pago (48,6 %): casi la mitad de lo comprometido se está incumpliendo.",
      "Menor calidad de promesa del grupo (67,3 %) y menor recaudo acumulado en proporción a su actividad (18,18 % de la meta, pese a ser la unidad más activa).",
      "Menor promesa promedio por cliente barrido ($38.411), la más baja de las cuatro unidades: llega a más clientes, pero con menor valor por contacto.",
    ],
    instruccion: "No se requiere más barrido; se requiere convertir el barrido ya realizado en pago efectivo. Revisar el proceso de seguimiento a promesas para reducir drásticamente la tasa de incumplimiento.",
  },
  {
    name: "Jhon Staper",
    subtitle: "Mejor productividad, menor escala",
    accent: YELLOW,
    stats: [
      { value: "17,09 %", label: "Cumplimiento de meta (el más bajo)" },
      { value: "$46.486", label: "Promesa promedio por cliente (la mejor)" },
      { value: "1.968", label: "Clientes en gestión (el mayor número)" },
      { value: "4º / 4", label: "Ranking integral" },
    ],
    fortalezas: [
      "Mejor promesa promedio por cliente barrido del grupo ($46.486), superando incluso a Danny/Santiago; su gestión genera más valor por contacto.",
      "Mayor número de clientes en gestión activa (1.968), lo que indica una operación con foco en profundizar el trabajo sobre los clientes contactados.",
      "Menor número de clientes en \"no contesta\" en segundo lugar (4.683) y calidad de promesa en rango medio (74,8 %), superior a Laura.",
    ],
    mejoras: [
      "Menor recaudo acumulado ($59,80 M) y menor % de cumplimiento de meta (17,09 %) del grupo.",
      "Segunda cobertura más baja de clientes (24,66 %) y de saldo (35,91 %): su buena productividad individual no se está traduciendo todavía en volumen suficiente.",
      "Mayor número de clientes renuentes del grupo (3.295), lo que puede estar limitando la conversión de la gestión en promesas nuevas.",
    ],
    instruccion: "Aumentar la escala de gestión y cobertura sin perder el valor promedio por cliente que ya logra; el reto no es la calidad de la negociación, sino el volumen de clientes trabajados.",
  },
];

export const actionPlanData = {
  headers: ["Unidad", "Mantener", "Corregir / priorizar", "Indicador de seguimiento", "Meta de cierre sugerida"],
  rows: [
    ["Danny / Santiago", "Ritmo de conversión y equilibrio operativo-económico", "Priorización de cartera de mayor saldo dentro del barrido", "% cumplimiento de meta semanal", "Superar 30 % de la meta antes del cierre"],
    ["Karen", "Calidad de negociación y control de promesas rotas", "Cobertura de clientes barridos; reducción de \"no contesta\"", "% cobertura de clientes barridos", "Llevar cobertura de 22,65 % a 28-30 %"],
    ["Laura", "Volumen y cobertura de barrido", "Seguimiento a promesas; reducir tasa de incumplimiento", "Promesa rota / promesa de pago", "Bajar de 48,6 % a menos de 30 %"],
    ["Jhon", "Productividad y valor por cliente gestionado", "Escalar número de clientes trabajados y renuentes reactivados", "Clientes barridos y clientes en gestión", "Subir cobertura de 24,66 % a 28-30 %"],
  ],
};
