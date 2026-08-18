/**
 * Card — Reusable property card component for Vitrina (Property Showcase)
 *
 * Atomic Design: Molecule
 * Uses W3C Design Tokens via CSS variables: var(--card-bg), var(--card-border), var(--card-radius)
 */
export default function Card({ id, title, description, price, imageUrl, badge, smokingRestriction, petRestriction, className = '' }) {
  return (
    <article
      className={`overflow-hidden transition-shadow duration-200 hover:shadow-lg ${className}`}
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--card-radius)',
      }}
    >
      {/* Image */}
      {imageUrl && (
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Badges — "Gastos Incluidos", "Prohibido Fumar" and "Prohibido Mascotas" */}
        <div className="mb-2 flex flex-wrap gap-2">
          {badge && (
            <span className="inline-block rounded bg-green-600 px-5 py-0.5 text-xs font-bold text-white">
              {badge}
            </span>
          )}
          {smokingRestriction && (
            <span className="inline-block rounded bg-red-600 px-5 py-0.5 text-xs font-bold text-white">
              {smokingRestriction}
            </span>
          )}
          {petRestriction && (
            <span className="inline-block rounded bg-orange-600 px-5 py-0.5 text-xs font-bold text-white">
              {petRestriction}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-1 text-lg font-semibold" style={{ color: 'var(--color-text-body)' }}>
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {description}
          </p>
        )}

        {/* Price */}
        {price && (
          <p className="text-base font-bold" style={{ color: 'var(--color-primary)' }}>
            {price} €/mes
          </p>
        )}
      </div>
    </article>
  );
}