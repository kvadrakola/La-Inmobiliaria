/**
 * Header — Site navigation & branding
 *
 * Atomic Design: Layout organism
 * Uses W3C Design Tokens via CSS variables: var(--header-bg), var(--header-text)
 */
export default function Header() {
  return (
    <header className="site-header">
      <div className="brand-logo">
        <a href="/" className="brand-mark flex items-center gap-2">
          <img src="/ChatGPT_Image_29_jul_2026_13_12_20.png" alt="Logo" className="h-12 w-12 rounded-sm" />
          HabitaFactoría
        </a>
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <ul className="flex items-center gap-6">
          <li>
            <a href="/" className="nav-item">Inicio</a>
          </li>
          <li>
            <a href="/buscar" className="nav-item">Propiedades</a>
          </li>
          <li>
            <a href="/contacto" className="nav-item">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 138bf7cefc787319becf3fc875d61629b574e52d
