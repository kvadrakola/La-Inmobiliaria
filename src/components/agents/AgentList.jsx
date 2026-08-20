/**
 * AgentList — Renders a grid of agent cards
 *
 * Atomic Design: Organism
 * Receives an array of agents and renders them using AgentCard.
 * Handles loading, empty and error states.
 */
import AgentCard from './AgentCard.jsx';

export default function AgentList({ agents = [], isLoading = false, error = null }) {
  /* ── Loading state ── */
  if (isLoading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((skeleton) => (
          <div key={skeleton} className="flex flex-col items-center text-center animate-pulse">
            <div className="mb-4 h-24 w-24 rounded-full bg-gray-300" />
            <div className="mb-2 h-4 w-32 rounded bg-gray-300" />
            <div className="h-3 w-24 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <p className="text-center text-red-500">
        Error al cargar los agentes: {error}
      </p>
    );
  }

  /* ── Empty state ── */
  if (!agents.length) {
    return (
      <p className="text-center" style={{ color: 'var(--color-text-muted)' }}>
        No hay agentes disponibles en este momento.
      </p>
    );
  }

  /* ── Success state ── */
  return (
    <section className="team-member-collection">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          name={agent.name}
          role={agent.role}
          photo={agent.photo}
        />
      ))}
    </section>
  );
}