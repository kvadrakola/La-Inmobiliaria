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
 */
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';

// ── Mock data (placeholder — will be replaced with API/backend) ─────
const agents = [
  { name: 'María García', role: 'Agente Senior', photo: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Carlos López', role: 'Agente de Alquileres', photo: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Ana Martínez', role: 'Asesora Estudiantil', photo: 'https://i.pravatar.cc/150?img=5' },
];

const properties = [
  {
    title: 'Habitación en el Centro',
    description: 'Habitación amueblada con vistas a la plaza mayor. Wifi, calefacción y limpieza incluidos.',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    badge: 'Gastos Incluidos',
  },
  {
    title: 'Estudio en Moncloa',
    description: 'Estudio completo cerca de la universidad. Ideal para estudiantes de intercambio.',
    price: 550,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    badge: 'Gastos Incluidos',
  },
  {
    title: 'Piso Compartido Chamberí',
    description: 'Habitación en piso compartido con 3 estudiantes. Ambiente internacional y acogedor.',
    price: 380,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    badge: 'Gastos Incluidos',
  },
];

export default function Home() {
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
                <Button variant="primary">Ver Propiedades</Button>
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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => (
                <div key={agent.name} className="flex flex-col items-center text-center">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="mb-4 h-24 w-24 rounded-full object-cover"
                    loading="lazy"
                  />
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-body)' }}>
                    {agent.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {agent.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Property Showcase / Vitrina ═══ */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-center text-2xl font-bold" style={{ color: 'var(--color-text-body)' }}>
              Vitrina de Propiedades
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <Card
                  key={property.title}
                  title={property.title}
                  description={property.description}
                  price={property.price}
                  imageUrl={property.imageUrl}
                  badge={property.badge}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button variant="outline">Ver Todas las Propiedades</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}