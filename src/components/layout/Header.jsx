/**
 * Header — Site navigation & branding
 *
 * Atomic Design: Layout organism
 * Uses W3C Design Tokens via CSS variables: var(--header-bg), var(--header-text)
 *
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 * Renders the agency brand mark and site navigation as semantic nodes
 * (see SCENE_GRAPH_MANIFEST in src/semantic-graph/manifest.js).
 *
 * Responsive behavior: horizontal nav >= 768px; hamburger toggle + absolute
 * dropdown panel < 768px. Menu closes on route change (useLocation effect).
 * Navigation actions carry Lucide-style inline SVG icons (stroke 2, 24 grid):
 * Propiedades → House, Restaurante → UtensilsCrossed.
 */
import { useEffect, useState } from 'react';
import { agencyFixture, siteNavigationFixture } from '../../semantic-graph/fixtures.js';
import logo from '../../img/logo.png';
import { Link, useLocation } from 'react-router-dom';

const MOBILE_NAV_ID = 'mobile-navigation';

const NAVIGATION_ROUTES = {
  'navigate-home': '/',
  'navigate-search': '/properties',
  'navigate-restaurant': '/restaurante',
  'navigate-about': '/about',
  'navigate-contact': '/contact',
};

const NAVIGATION_ICONS = {
  'navigate-search': 'house',
  'navigate-restaurant': 'utensils-crossed',
};

function BrandIdentityMark() {
  return (
    <Link
      to="/"
      className="brand-mark flex items-center gap-2"
      data-node-id={`${agencyFixture.id}-brand-mark`}
      data-node-type="agency"
      data-semantic-role="field"
      data-concept-id="agency-trade-name"
      data-content-kind="text"
      data-content-source="fixture"
      data-required="true"
      data-ref={agencyFixture.id}
      data-rel="belongs-to"
    >
      <img src={logo} alt="Logo HabitaFactoría" className="h-12 w-12 rounded-sm" />
      {agencyFixture.tradeName}
    </Link>
  );
}

function NavigationIcon({ name }) {
  if (name === 'house') {
    return (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9.5 12 3l9 6.5" />
        <path d="M5 10v10h14V10" />
        <path d="M10 20v-6h4v6" />
      </svg>
    );
  }

  if (name === 'utensils-crossed') {
    return (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
        <path d="M15 15 3.5 3.5a2.1 2.1 0 0 0-3 3L12 18" />
        <path d="M5 19l14-14" />
      </svg>
    );
  }

  return null;
}

function NavigationAction({ item }) {
  const route = NAVIGATION_ROUTES[item.intent] ?? '/';
  const iconName = NAVIGATION_ICONS[item.intent];
  const className = item.dividerBefore ? 'nav-item nav-item--divider' : 'nav-item';

  return (
    <Link
      to={route}
      className={className}
      data-node-id={item.id}
      data-node-type="agency"
      data-semantic-role="action"
      data-action-id={item.id}
      data-action-intent={item.intent}
      data-content-kind="action-label"
    >
      {iconName ? <NavigationIcon name={iconName} /> : null}
      {item.label}
    </Link>
  );
}

function MobileNavToggle({ isMenuOpen, onToggle }) {
  return (
    <button
      type="button"
      className="mobile-nav-toggle"
      aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
      aria-expanded={isMenuOpen}
      aria-controls={MOBILE_NAV_ID}
      onClick={onToggle}
    >
      {isMenuOpen ? (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = siteNavigationFixture.items;

  return (
    <header className="site-header">
      <div className="brand-logo">
        <BrandIdentityMark />
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavigationAction item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <MobileNavToggle
        isMenuOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen((isOpen) => !isOpen)}
      />

      <nav
        id={MOBILE_NAV_ID}
        className={`mobile-nav${isMenuOpen ? ' is-open' : ''}`}
        aria-label="Menú de navegación móvil"
      >
        <ul className="mobile-nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavigationAction item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}