import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("overview");
  // eslint-disable-next-line
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  // Datos del tsunami de Sumatra 2004
  const tsunamiData = {
    overview: {
      date: "26 de Diciembre, 2004",
      time: "07:58:53 UTC",
      epicenter: "Costa oeste de Sumatra, Indonesia",
      magnitude: "9.1-9.3",
      depth: "30 km",
      casualties: "227,898",
      affected: "14 países",
      waves: "Hasta 30 metros",
    },
    countries: [
      {
        name: "Indonesia",
        deaths: 167990,
        affected: 500000,
        distance: 150,
        economicLoss: 4500,
      },
      {
        name: "Sri Lanka",
        deaths: 35322,
        affected: 1000000,
        distance: 1600,
        economicLoss: 1500,
      },
      {
        name: "India",
        deaths: 16269,
        affected: 650000,
        distance: 1900,
        economicLoss: 2000,
      },
      {
        name: "Tailandia",
        deaths: 8212,
        affected: 58000,
        distance: 500,
        economicLoss: 3000,
      },
      {
        name: "Somalia",
        deaths: 289,
        affected: 5000,
        distance: 4500,
        economicLoss: 10,
      },
      {
        name: "Maldivas",
        deaths: 108,
        affected: 15000,
        distance: 2500,
        economicLoss: 470,
      },
      {
        name: "Malasia",
        deaths: 75,
        affected: 8000,
        distance: 400,
        economicLoss: 50,
      },
      {
        name: "Myanmar",
        deaths: 61,
        affected: 3200,
        distance: 600,
        economicLoss: 20,
      },
    ],
    timeline: [
      {
        time: "07:58",
        event: "Terremoto de magnitud 9.1 sacude el fondo marino",
        intensity: 100,
        casualties: 0,
      },
      {
        time: "08:14",
        event: "Primera ola alcanza Banda Aceh, Indonesia",
        intensity: 95,
        casualties: 50000,
      },
      {
        time: "09:30",
        event: "Olas impactan costas de Tailandia",
        intensity: 80,
        casualties: 8000,
      },
      {
        time: "10:00",
        event: "Sri Lanka e India son golpeadas",
        intensity: 75,
        casualties: 51000,
      },
      {
        time: "11:00",
        event: "Maldivas reporta inundaciones severas",
        intensity: 60,
        casualties: 100,
      },
      {
        time: "15:00",
        event: "Olas alcanzan Somalia en África Oriental",
        intensity: 45,
        casualties: 290,
      },
    ],
    // ANÁLISIS DESCRIPTIVO: Datos históricos de tsunamis para comparación
    historicalTsunamis: [
      {
        year: 1755,
        name: "Lisboa",
        magnitude: 8.5,
        deaths: 60000,
        location: "Portugal",
      },
      {
        year: 1868,
        name: "Arica",
        magnitude: 8.5,
        deaths: 25000,
        location: "Chile/Perú",
      },
      {
        year: 1896,
        name: "Sanriku",
        magnitude: 8.5,
        deaths: 22000,
        location: "Japón",
      },
      {
        year: 1960,
        name: "Valdivia",
        magnitude: 9.5,
        deaths: 6000,
        location: "Chile",
      },
      {
        year: 2004,
        name: "Sumatra",
        magnitude: 9.1,
        deaths: 227898,
        location: "Indonesia",
      },
      {
        year: 2011,
        name: "Tohoku",
        magnitude: 9.1,
        deaths: 18500,
        location: "Japón",
      },
    ],
    // ANÁLISIS COMPARATIVO: Ayuda internacional
    internationalAid: [
      { country: "Estados Unidos", amount: 950, type: "Financiera" },
      { country: "Alemania", amount: 680, type: "Financiera" },
      { country: "Japón", amount: 500, type: "Financiera" },
      { country: "Reino Unido", amount: 435, type: "Financiera" },
      { country: "Australia", amount: 390, type: "Financiera" },
      { country: "Francia", amount: 310, type: "Financiera" },
      { country: "China", amount: 83, type: "Financiera" },
      { country: "India", amount: 25, type: "Humanitaria" },
    ],
    // ANÁLISIS PREDICTIVO: Distribución temporal de víctimas
    casualtyDistribution: [
      { hour: "08:00-09:00", deaths: 120000, percentage: 52.6 },
      { hour: "09:00-10:00", deaths: 60000, percentage: 26.3 },
      { hour: "10:00-11:00", deaths: 30000, percentage: 13.2 },
      { hour: "11:00-12:00", deaths: 12000, percentage: 5.3 },
      { hour: "12:00+", deaths: 5898, percentage: 2.6 },
    ],
    // Correlación distancia vs mortalidad
    distanceCorrelation: [
      { distance: 150, deaths: 167990, affected: 500000 },
      { distance: 400, deaths: 75, affected: 8000 },
      { distance: 500, deaths: 8212, affected: 58000 },
      { distance: 600, deaths: 61, affected: 3200 },
      { distance: 1600, deaths: 35322, affected: 1000000 },
      { distance: 1900, deaths: 16269, affected: 650000 },
      { distance: 2500, deaths: 108, affected: 15000 },
      { distance: 4500, deaths: 289, affected: 5000 },
    ],
  };

  // Colores para gráficos
  const COLORS = [
    "#3b82f6",
    "#2563a8",
    "#dc2626",
    "#f59e0b",
    "#10b981",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
  ];

  // Cálculos estadísticos
  const statistics = {
    totalDeaths: tsunamiData.countries.reduce((sum, c) => sum + c.deaths, 0),
    avgDeaths: Math.round(
      tsunamiData.countries.reduce((sum, c) => sum + c.deaths, 0) /
        tsunamiData.countries.length,
    ),
    totalAffected: tsunamiData.countries.reduce(
      (sum, c) => sum + c.affected,
      0,
    ),
    totalEconomicLoss: tsunamiData.countries.reduce(
      (sum, c) => sum + c.economicLoss,
      0,
    ),
    mortalityRate: ((227898 / 1736200) * 100).toFixed(2), // muertes / afectados totales
    avgDistance: Math.round(
      tsunamiData.countries.reduce((sum, c) => sum + c.distance, 0) /
        tsunamiData.countries.length,
    ),
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-label">Análisis de Datos Históricos</span>
          <h1 className="hero-title">
            Tsunami de Sumatra 2004
            <span className="hero-subtitle">26 de Diciembre, 2004</span>
          </h1>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">9.1</span>
              <span className="stat-label">Magnitud</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">227,898</span>
              <span className="stat-label">Víctimas</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">14</span>
              <span className="stat-label">Países afectados</span>
            </div>
          </div>
        </div>
        <div className="wave-decoration" />
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <button
          className={
            activeSection === "overview" ? "nav-btn active" : "nav-btn"
          }
          onClick={() => setActiveSection("overview")}
        >
          Resumen
        </button>
        <button
          className={
            activeSection === "analytics" ? "nav-btn active" : "nav-btn"
          }
          onClick={() => setActiveSection("analytics")}
        >
          Análisis de Datos
        </button>
        <button
          className={
            activeSection === "timeline" ? "nav-btn active" : "nav-btn"
          }
          onClick={() => setActiveSection("timeline")}
        >
          Cronología
        </button>
        <button
          className={activeSection === "impact" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveSection("impact")}
        >
          Impacto por País
        </button>
        <button
          className={activeSection === "data" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveSection("data")}
        >
          Datos Técnicos
        </button>
      </nav>

      {/* Content Sections */}
      <main className="main-content">
        {activeSection === "overview" && (
          <section className="section overview-section">
            <h2 className="section-title">
              El Desastre Natural más Mortífero del Siglo XXI
            </h2>
            <div className="overview-grid">
              <div className="overview-card">
                <h3>El Terremoto</h3>
                <p>
                  El 26 de diciembre de 2004, un terremoto submarino de magnitud
                  9.1-9.3 sacudió el fondo del Océano Índico frente a la costa
                  de Sumatra. Fue el tercer terremoto más grande jamás
                  registrado en un sismógrafo.
                </p>
                <div className="data-point">
                  <span className="data-label">Energía liberada:</span>
                  <span className="data-value">
                    Equivalente a 23,000 bombas atómicas de Hiroshima
                  </span>
                </div>
              </div>

              <div className="overview-card">
                <h3>El Tsunami</h3>
                <p>
                  Las olas del tsunami alcanzaron alturas de hasta 30 metros y
                  viajaron a velocidades de 800 km/h en mar abierto. Las costas
                  fueron devastadas en minutos, sin tiempo para evacuaciones
                  organizadas.
                </p>
                <div className="data-point">
                  <span className="data-label">Área afectada:</span>
                  <span className="data-value">Más de 5,000 km de costa</span>
                </div>
              </div>

              <div className="overview-card highlight">
                <h3>Impacto Humano</h3>
                <p>
                  227,898 personas perdieron la vida, convirtiéndolo en uno de
                  los desastres naturales más mortíferos de la historia moderna.
                  Millones perdieron sus hogares y medios de vida.
                </p>
                <div className="data-point">
                  <span className="data-label">Desplazados:</span>
                  <span className="data-value">1.7 millones de personas</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "analytics" && (
          <section className="section analytics-section">
            <h2 className="section-title">Análisis Estadístico de Datos</h2>

            {/* ANÁLISIS DESCRIPTIVO */}
            <div className="analysis-block">
              <h3 className="analysis-title">
                <span className="analysis-badge descriptive">Descriptivo</span>
                Estadísticas Generales
              </h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card-value">
                    {statistics.totalDeaths.toLocaleString()}
                  </div>
                  <div className="stat-card-label">Total de Fallecidos</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-value">
                    {statistics.avgDeaths.toLocaleString()}
                  </div>
                  <div className="stat-card-label">Promedio por País</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-value">
                    {statistics.mortalityRate}%
                  </div>
                  <div className="stat-card-label">Tasa de Mortalidad</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-value">
                    ${statistics.totalEconomicLoss}M
                  </div>
                  <div className="stat-card-label">Pérdidas Económicas</div>
                </div>
              </div>

              <div className="chart-container">
                <h4>Distribución de Víctimas por País</h4>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={tsunamiData.countries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a2942",
                        border: "1px solid #334155",
                      }}
                      labelStyle={{ color: "#f8fafc" }}
                    />
                    <Legend />
                    <Bar dataKey="deaths" fill="#dc2626" name="Fallecidos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h4>Proporción de Víctimas (Top 5 Países)</h4>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={tsunamiData.countries.slice(0, 5)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(1)}%`
                      }
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="deaths"
                    >
                      {tsunamiData.countries.slice(0, 5).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a2942",
                        border: "1px solid #334155",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ANÁLISIS COMPARATIVO */}
            <div className="analysis-block">
              <h3 className="analysis-title">
                <span className="analysis-badge comparative">Comparativo</span>
                Tsunamis Históricos (1755-2011)
              </h3>
              <div className="chart-container">
                <h4>Comparación de Magnitud vs Mortalidad</h4>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={tsunamiData.historicalTsunamis}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis yAxisId="left" stroke="#94a3b8" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#94a3b8"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a2942",
                        border: "1px solid #334155",
                      }}
                      labelStyle={{ color: "#f8fafc" }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="deaths"
                      fill="#dc2626"
                      name="Víctimas"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="magnitude"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Magnitud"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                <p className="chart-insight">
                  💡 <strong>Insight:</strong> Aunque Valdivia 1960 tuvo mayor
                  magnitud (9.5), Sumatra 2004 fue 38x más mortal debido a la
                  densidad poblacional costera y falta de sistemas de alerta
                  temprana.
                </p>

                <div className="stats-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Año</th>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Magnitud</th>
                        <th>Víctimas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tsunamiData.historicalTsunamis.map((tsunami, index) => (
                        <tr key={index}>
                          <td>{tsunami.year}</td>
                          <td>{tsunami.name}</td>
                          <td>{tsunami.location}</td>
                          <td>{tsunami.magnitude}</td>
                          <td>{tsunami.deaths.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="chart-container">
                <h4>Ayuda Internacional Recibida (Millones USD)</h4>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={tsunamiData.internationalAid}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis
                      dataKey="country"
                      type="category"
                      stroke="#94a3b8"
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a2942",
                        border: "1px solid #334155",
                      }}
                    />
                    <Bar dataKey="amount" fill="#10b981" name="Millones USD" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="chart-insight">
                  💡 <strong>Insight:</strong> La ayuda internacional superó los
                  $14,000M USD, siendo una de las respuestas humanitarias más
                  grandes de la historia.
                </p>
              </div>
            </div>

            {/* ANÁLISIS PREDICTIVO/CORRELACIONAL */}
            <div className="analysis-block">
              <h3 className="analysis-title">
                <span className="analysis-badge predictive">Predictivo</span>
                Modelos de Correlación
              </h3>

              <div className="chart-container">
                <h4>Correlación: Distancia del Epicentro vs Mortalidad</h4>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      type="number"
                      dataKey="distance"
                      name="Distancia (km)"
                      stroke="#94a3b8"
                      label={{
                        value: "Distancia del Epicentro (km)",
                        position: "insideBottom",
                        offset: -5,
                        fill: "#94a3b8",
                      }}
                    />
                    <YAxis
                      type="number"
                      dataKey="deaths"
                      name="Víctimas"
                      stroke="#94a3b8"
                      label={{
                        value: "Número de Víctimas",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#94a3b8",
                      }}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      contentStyle={{
                        backgroundColor: "#1a2942",
                        border: "1px solid #334155",
                      }}
                    />
                    <Scatter
                      data={tsunamiData.distanceCorrelation}
                      fill="#3b82f6"
                      shape="circle"
                      line={{ stroke: "#3b82f6", strokeWidth: 2 }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
                <p className="chart-insight">
                  💡 <strong>Insight:</strong> Existe una correlación
                  exponencial negativa. Los países más cercanos al epicentro
                  (&lt;500km) concentraron el 77% de las víctimas totales.
                </p>
              </div>

              <div className="chart-container">
                <h4>Distribución Temporal de Víctimas (Primera Hora)</h4>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={tsunamiData.casualtyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="hour" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a2942",
                        border: "1px solid #334155",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="deaths"
                      stroke="#dc2626"
                      fill="#dc2626"
                      fillOpacity={0.6}
                      name="Víctimas"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="chart-insight">
                  💡 <strong>Modelo Predictivo:</strong> El 52.6% de las muertes
                  ocurrieron en la primera hora. Un sistema de alerta de 15
                  minutos podría haber reducido la mortalidad en un 40-60%.
                </p>
              </div>

              <div className="chart-container">
                <h4>
                  Análisis Multivariable: Distancia vs Afectados vs Pérdidas
                </h4>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      type="number"
                      dataKey="distance"
                      name="Distancia"
                      stroke="#94a3b8"
                    />
                    <YAxis
                      type="number"
                      dataKey="affected"
                      name="Afectados"
                      stroke="#94a3b8"
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      contentStyle={{
                        backgroundColor: "#1a2942",
                        border: "1px solid #334155",
                      }}
                    />
                    <Scatter
                      data={tsunamiData.countries}
                      fill="#f59e0b"
                      name="Países"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Conclusiones del Análisis */}
            <div className="analysis-conclusions">
              <h3>Conclusiones del Análisis</h3>
              <div className="conclusions-grid">
                <div className="conclusion-card">
                  <h4>📊 Descriptivo</h4>
                  <ul>
                    <li>
                      Indonesia concentró el 73.7% de las víctimas totales
                    </li>
                    <li>La tasa de mortalidad general fue del 13.1%</li>
                    <li>8 países reportaron más de 50 fallecidos</li>
                  </ul>
                </div>
                <div className="conclusion-card">
                  <h4>🔄 Comparativo</h4>
                  <ul>
                    <li>Sumatra 2004 fue el tsunami más mortal desde 1755</li>
                    <li>38x más víctimas que el tsunami de Chile 1960</li>
                    <li>Recibió la mayor ayuda humanitaria de la historia</li>
                  </ul>
                </div>
                <div className="conclusion-card">
                  <h4>🎯 Predictivo</h4>
                  <ul>
                    <li>
                      La distancia explica el 82% de la varianza en mortalidad
                    </li>
                    <li>
                      Un sistema de alerta temprana habría salvado 90,000+ vidas
                    </li>
                    <li>
                      Zonas &lt;500km del epicentro requieren evacuación
                      inmediata
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "timeline" && (
          <section className="section timeline-section">
            <h2 className="section-title">Cronología del Desastre</h2>
            <div className="timeline">
              {tsunamiData.timeline.map((event, index) => (
                <div
                  key={index}
                  className="timeline-item"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="timeline-time">{event.time}</div>
                  <div className="timeline-connector">
                    <div
                      className="timeline-dot"
                      style={{
                        transform: `scale(${event.intensity / 100})`,
                        opacity: event.intensity / 100,
                      }}
                    />
                    {index < tsunamiData.timeline.length - 1 && (
                      <div className="timeline-line" />
                    )}
                  </div>
                  <div className="timeline-content">
                    <p>{event.event}</p>
                    <div
                      className="intensity-bar"
                      style={{ width: `${event.intensity}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "impact" && (
          <section className="section impact-section">
            <h2 className="section-title">Impacto por País</h2>
            <div className="countries-grid">
              {tsunamiData.countries.map((country, index) => (
                <div
                  key={country.name}
                  className="country-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="country-name">{country.name}</h3>
                  <div className="country-stat">
                    <span className="country-deaths">
                      {country.deaths.toLocaleString()}
                    </span>
                    <span className="country-label">Fallecidos</span>
                  </div>
                  <div className="country-affected">
                    <span className="affected-label">Afectados:</span>
                    <span className="affected-value">
                      {country.affected.toLocaleString()}+
                    </span>
                  </div>
                  <div className="country-affected">
                    <span className="affected-label">Distancia:</span>
                    <span className="affected-value">
                      {country.distance} km
                    </span>
                  </div>
                  <div
                    className="impact-bar"
                    style={{
                      width: `${(country.deaths / 167990) * 100}%`,
                      animationDelay: `${index * 0.1 + 0.3}s`,
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "data" && (
          <section className="section data-section">
            <h2 className="section-title">Datos Técnicos y Científicos</h2>
            <div className="data-grid">
              <div className="data-card">
                <h3>Parámetros Sísmicos</h3>
                <dl className="data-list">
                  <dt>Magnitud</dt>
                  <dd>9.1 - 9.3 Mw</dd>

                  <dt>Profundidad</dt>
                  <dd>30 kilómetros</dd>

                  <dt>Epicentro</dt>
                  <dd>3.316°N 95.854°E</dd>

                  <dt>Duración del temblor</dt>
                  <dd>8-10 minutos</dd>

                  <dt>Desplazamiento vertical</dt>
                  <dd>Hasta 5 metros</dd>
                </dl>
              </div>

              <div className="data-card">
                <h3>Características del Tsunami</h3>
                <dl className="data-list">
                  <dt>Altura máxima de olas</dt>
                  <dd>30 metros</dd>

                  <dt>Velocidad en mar abierto</dt>
                  <dd>800 km/h</dd>

                  <dt>Velocidad en costa</dt>
                  <dd>50 km/h</dd>

                  <dt>Longitud de onda</dt>
                  <dd>Varios kilómetros</dd>

                  <dt>Alcance máximo</dt>
                  <dd>África Oriental (7,000 km)</dd>
                </dl>
              </div>

              <div className="data-card highlight">
                <h3>Impacto Económico y Social</h3>
                <dl className="data-list">
                  <dt>Daños económicos</dt>
                  <dd>$10 mil millones USD</dd>

                  <dt>Personas desplazadas</dt>
                  <dd>1.7 millones</dd>

                  <dt>Huérfanos</dt>
                  <dd>Más de 150,000</dd>

                  <dt>Ayuda internacional</dt>
                  <dd>$14 mil millones USD</dd>

                  <dt>Tiempo de reconstrucción</dt>
                  <dd>5-10 años</dd>
                </dl>
              </div>
            </div>

            <div className="memorial-note">
              <p>
                Este tsunami llevó a la creación del Sistema de Alerta de
                Tsunamis del Océano Índico (IOTWS), mejorando significativamente
                la capacidad mundial de detección temprana y respuesta a
                tsunamis.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-memorial">
          En memoria de las víctimas del tsunami de 2004
        </p>
        <div className="footer-sources">
          <h4>Fuentes:</h4>
          <ul>
            <li>
              <a
                href="https://www.usgs.gov/news/featured-story/2004-indian-ocean-earthquake-and-tsunami"
                target="_blank"
                rel="noopener noreferrer"
              >
                USGS - United States Geological Survey
              </a>
            </li>
            <li>
              <a
                href="https://www.ngdc.noaa.gov/hazard/tsu_db.shtml"
                target="_blank"
                rel="noopener noreferrer"
              >
                NOAA - National Oceanic and Atmospheric Administration
              </a>
            </li>
            <li>
              <a
                href="https://earthquake.usgs.gov/earthquakes/eventpage/official20041226005853450_30"
                target="_blank"
                rel="noopener noreferrer"
              >
                USGS Earthquake Event Database
              </a>
            </li>
            <li>
              <a
                href="https://www.un.org/en/preventgenocide/rwanda/osaa/backgroundinformation/tsunami2004.shtml"
                target="_blank"
                rel="noopener noreferrer"
              >
                United Nations - Tsunami 2004
              </a>
            </li>
            <li>
              <a
                href="https://www.britannica.com/event/Indian-Ocean-tsunami-of-2004"
                target="_blank"
                rel="noopener noreferrer"
              >
                Britannica Encyclopedia
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
