/**
 * Header — Site navigation & branding
 *
 * Atomic Design: Layout organism
 * Uses W3C Design Tokens via CSS variables: var(--header-bg), var(--header-text)
 */
export default function Header() {
  return (
    <header
      className="w-full"
      style={{
        backgroundColor: 'var(--header-bg)',
        color: 'var(--header-text)',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <a href="/" className="text-xl font-bold tracking-tight">
          HabitaFactoría
        </a>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul className="flex gap-6">
            <li>
              <a href="/" className="text-sm font-medium transition-opacity hover:opacity-80">
                Inicio
              </a>
            </li>
            <li>
              <a href="/properties" className="text-sm font-medium transition-opacity hover:opacity-80">
                Propiedades
              </a>
            </li>
            <li>
              <a href="/about" className="text-sm font-medium transition-opacity hover:opacity-80">
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a href="/contact" className="text-sm font-medium transition-opacity hover:opacity-80">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}