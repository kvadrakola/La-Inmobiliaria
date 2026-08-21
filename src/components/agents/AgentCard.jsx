/**
 * AgentCard — Reusable agent card component for team display
 *
 * Atomic Design: Molecule
 * Displays agent photo, name and role.
 */
export default function AgentCard({ name, role, photo, className = '' }) {
  return (
    <article className={className}>
      <img
        src={photo}
        alt={name}
        className="mb-4 h-24 w-24 rounded-full object-cover"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-body)' }}>
        {name}
      </h3>
      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        {role}
      </p>
    </article>
  );
}