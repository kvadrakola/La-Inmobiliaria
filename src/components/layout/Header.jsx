/**
 * Header — Site navigation & branding
 *
 * Atomic Design: Layout organism
 * Uses W3C Design Tokens via CSS variables: var(--header-bg), var(--header-text)
 */
    <header className="site-header">
      <div className="brand-logo">
        <a href="/" className="brand-mark flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-sm" />
          HabitaFactoría
        </a>
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <ul className="flex items-center gap-6">
          <li>
            <a href="/" className="nav-item">Inicio</a>
          </li>
          <li>
            <a href="/properties" className="nav-item">Propiedades</a>
          </li>
          <li>
            <a href="/about" className="nav-item">Sobre Nosotros</a>
          </li>
          <li>
            <a href="/contact" className="nav-item">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
