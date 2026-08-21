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
 *
 * Navigation actions carry Lucide icons (stroke 2, 24 grid):
 * Propiedades → Building2, Restaurante → UtensilsCrossed.
 *
 * The two main business lines (Propiedades + Restaurante) are grouped into a
 * visually distinct cluster so they read as the agency's core services,
 * separated from the informational links (Inicio / Sobre Nosotros / Contacto).
 * On mobile the cluster is rendered as a contained block so both items sit at
 * the same indentation level (never parent/child).
 */
import { useEffect, useState } from 'react';
import { Building2, UtensilsCrossed } from 'lucide-react';
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

/** Intents that belong to the core business-lines cluster (Propiedades + Restaurante). */
const BUSINESS_CLUSTER_INTENTS = new Set(['navigate-search', 'navigate-restaurant']);

const NAVIGATION_ICONS = {
  'navigate-search': Building2,
  'navigate-restaurant': UtensilsCrossed,
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

function NavigationAction({ item }) {
  const route = NAVIGATION_ROUTES[item.intent] ?? '/';
  const Icon = NAVIGATION_ICONS[item.intent];

  return (
    <Link
      to={route}
      className="nav-item"
      data-node-id={item.id}
      data-node-type="agency"
      data-semantic-role="action"
      data-action-id={item.id}
      data-action-intent={item.intent}
      data-content-kind="action-label"
    >
      {Icon ? <Icon size={17} strokeWidth={2} aria-hidden="true" /> : null}
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
  const businessItems = navItems.filter((item) => BUSINESS_CLUSTER_INTENTS.has(item.intent));
  const infoItems = navItems.filter((item) => !BUSINESS_CLUSTER_INTENTS.has(item.intent));

  return (
    <header className="site-header">
      <div className="brand-logo">
        <BrandIdentityMark />
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <ul className="flex items-center gap-6">
          {infoItems.map((item) => (
            <li key={item.id}>
              <NavigationAction item={item} />
            </li>
          ))}
          <li className="nav-cluster" aria-label="Servicios principales">
            {businessItems.map((item) => (
              <NavigationAction key={item.id} item={item} />
            ))}
          </li>
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
          {infoItems.map((item) => (
            <li key={item.id}>
              <NavigationAction item={item} />
            </li>
          ))}
          <li className="mobile-nav-cluster" aria-label="Servicios principales">
            {businessItems.map((item) => (
              <NavigationAction key={item.id} item={item} />
            ))}
          </li>
        </ul>
      </nav>
    </header>
  );
}