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

export default function Home() {
  const [agents, setAgents] = useState([]);
  const [agentsLoading, setAgentsLoading] = useState(true);
  const [agentsError, setAgentsError] = useState(null);

  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState(null);

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
        setPropertiesLoading(false);
      })
      .catch((err) => {
        setPropertiesError(err.message);
        setPropertiesLoading(false);
      });
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* ═══ Agency History ═══ */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
                  style={{ color: 'var(--color-primary)' }}>
                HabitaFactoría
              </h1>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
                Desde 2018, ayudamos a estudiantes a encontrar el hogar perfecto en Madrid.
                Nuestra misión es ofrecer alquileres transparentes, sin comisiones ocultas,
                con <strong>"Gastos Incluidos"</strong> y la tranquilidad de un contrato
                legal bajo la normativa <strong>RD 1312/2024</strong>.
              </p>
              <div className="mt-6">
                <Link to="/properties" className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--button-bg)' }}>
                  Ver Propiedades
                </Link>
              </div>
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
              properties={properties}
              isLoading={propertiesLoading}
              error={propertiesError}
            />
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