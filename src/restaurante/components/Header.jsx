function Header() {
  return (
    <header className="site-header">
      <div className="brand-logo">
        <a href="/" className="brand-mark flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-[#0047ab] text-lg font-bold text-white">
            R
          </span>
          RestauranteApp
        </a>
      </div>
      <nav className="site-nav" aria-label="Main navigation">
        <ul className="flex items-center gap-6">
          <li><a href="/" className="nav-item">Inicio</a></li>
          <li><a href="/contacto" className="nav-item">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
