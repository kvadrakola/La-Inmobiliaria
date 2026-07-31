/**
 * PropertyList — Renders a grid of property cards
 *
 * Atomic Design: Organism
 * Receives an array of properties and renders them using Card.
 * Handles loading, empty and error states.
 */
import Card from '../ui/Card.jsx';

export default function PropertyList({ properties = [], isLoading = false, error = null }) {
  /* ── Loading state ── */
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((skeleton) => (
          <div key={skeleton} className="animate-pulse overflow-hidden rounded-xl bg-gray-100">
            <div className="aspect-[4/3] w-full bg-gray-300" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-24 rounded bg-gray-300" />
              <div className="h-5 w-48 rounded bg-gray-300" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-5 w-20 rounded bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <p className="text-center text-red-500">
        Error al cargar las propiedades: {error}
      </p>
    );
  }

  /* ── Empty state ── */
  if (!properties.length) {
    return (
      <p className="text-center" style={{ color: 'var(--color-text-muted)' }}>
        No hay propiedades disponibles en este momento.
      </p>
    );
  }

  /* ── Success state ── */
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card
          key={property.id}
          id={property.id}
          title={property.title}
          description={property.description}
          price={property.price}
          imageUrl={property.imageUrl}
          badge={property.badge}
        />
      ))}
    </div>
  );
}