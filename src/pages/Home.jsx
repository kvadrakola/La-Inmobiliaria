/** @deprecated Replaced by src/semantic-graph/pages/HomeSceneGraph.jsx — not mounted from App. */
/**
 * Home — Main landing page
 *
 * Page structure (per CLAUDE.md): [HEADER, MAIN, FOOTER]
 * Content requirements:
 * - Agency History (Historia de la agencia)
 * - Agent Info (Fotos/Nombres de agentes)
 * - Property Showcase / Vitrina (Vitrina de propiedades)
 * - "Gastos Incluidos" labels on property cards
 *
 * Data is fetched from mockData. Replace with real API calls when backend is ready.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import AgentList from '../components/agents/AgentList.jsx';
import PropertyList from '../components/properties/PropertyList.jsx';
import { fetchAgents, fetchProperties } from '../data/mockData.js';
import board from '../components/img/Board.png';

export default function Home() {
  const [agents, setAgents] = useState([]);
  const [agentsLoading, setAgentsLoading] = useState(true);
  const [agentsError, setAgentsError] = useState(null);

  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState(null);
  const [propertySlide, setPropertySlide] = useState(0);

  useEffect(() => {
    fetchAgents()
      .then((data) => {
        setAgents(data);
        setAgentsLoading(false);
      })
      .catch((err) => {
        setAgentsError(err.message);
        setAgentsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchProperties()
      .then((data) => {
        setProperties(data);
        setPropertySlide(0);
        setPropertiesLoading(false);
      })
      .catch((err) => {
        setPropertiesError(err.message);
        setPropertiesLoading(false);
      });
  }, []);

  const propertySlideCount = Math.max(1, Math.ceil(properties.length / 3));

  useEffect(() => {
    if (propertySlideCount <= 1) return undefined;

    const carouselTimer = window.setInterval(() => {
      setPropertySlide((currentSlide) => (currentSlide + 1) % propertySlideCount);
    }, 30000);

    return () => window.clearInterval(carouselTimer);
  }, [propertySlideCount]);

  const visibleProperties = properties.slice(propertySlide * 3, propertySlide * 3 + 3);

  return (
    <>
      <Header />

      <main>
        {/* ═══ Agency History ═══ */}
        <section className="bg-[#0047AB] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  HabitaFactoría
                </h1>
                <p className="text-lg leading-relaxed text-white/95">
                  Desde 2018, ayudamos a estudiantes a encontrar el hogar perfecto en Madrid.
                  Nuestra misión es ofrecer alquileres transparentes, sin comisiones ocultas,
                  con <strong>"Gastos Incluidos"</strong> y la tranquilidad de un contrato
                  legal bajo la normativa <strong>RD 1312/2024</strong>.
                </p>
                <div className="mt-6">
                  <Link to="/properties" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-[#0047AB] transition-opacity hover:opacity-90">
                    Ver Propiedades
                  </Link>
                </div>
              </div>
              <img
                src={board}
                alt="Historia"
                className="w-full md:w-1/2 h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* ═══ Agent Info ═══ */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-center text-2xl font-bold" style={{ color: 'var(--color-text-body)' }}>
              Nuestro Equipo
            </h2>
            <AgentList
              agents={agents}
              isLoading={agentsLoading}
              error={agentsError}
            />
          </div>
        </section>

        {/* ═══ Property Showcase / Vitrina ═══ */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-center text-2xl font-bold" style={{ color: 'var(--color-text-body)' }}>
              Vitrina de Propiedades
            </h2>
            <PropertyList
              properties={visibleProperties}
              isLoading={propertiesLoading}
              error={propertiesError}
            />
            {!propertiesLoading && !propertiesError && propertySlideCount > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4" aria-label="Carrusel de propiedades">
                <button
                  type="button"
                  onClick={() => setPropertySlide((propertySlide - 1 + propertySlideCount) % propertySlideCount)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-600 text-xl text-blue-600 transition-colors hover:bg-blue-50"
                  aria-label="Ver propiedades anteriores"
                >
                  &#8592;
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: propertySlideCount }, (_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setPropertySlide(index)}
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${propertySlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                      aria-label={`Mostrar grupo de propiedades ${index + 1}`}
                      aria-current={propertySlide === index ? 'true' : undefined}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setPropertySlide((propertySlide + 1) % propertySlideCount)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-600 text-xl text-blue-600 transition-colors hover:bg-blue-50"
                  aria-label="Ver siguientes propiedades"
                >
                  &#8594;
                </button>
              </div>
            )}
            <div className="mt-10 text-center">
              <Link to="/properties" className="inline-flex items-center justify-center rounded-md border-2 border-blue-600 bg-transparent px-5 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
                Ver Todas las Propiedades
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
