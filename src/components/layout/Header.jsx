/**
 * Header — Site navigation & branding
 *
 * Atomic Design: Layout organism
 * Uses W3C Design Tokens via CSS variables: var(--header-bg), var(--header-text)
 */
import { Link } from 'react-router-dom';

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
        <Link to="/" className="text-xl font-bold tracking-tight">
          HabitaFactoría
        </Link>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="text-sm font-medium transition-opacity hover:opacity-80">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/properties" className="text-sm font-medium transition-opacity hover:opacity-80">
                Propiedades
              </Link>
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