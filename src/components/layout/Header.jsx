/**
 * Header — Site navigation & branding
 *
 * Atomic Design: Layout organism
 * Uses W3C Design Tokens via CSS variables: var(--header-bg), var(--header-text)
 *
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 * Renders the agency brand mark and site navigation as semantic nodes
 * (see SCENE_GRAPH_MANIFEST in src/semantic-graph/manifest.js).
 */
import { agencyFixture, siteNavigationFixture } from '../../semantic-graph/fixtures.js';
import logo from '../../img/logo.png';

function BrandIdentityMark() {
  return (
    <a
      href="/"
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
    </a>
  );
}

function NavigationAction({ item }) {
  const href =
    item.intent === 'navigate-restaurant'
      ? '/restaurante'
      : item.intent === 'navigate-home'
        ? '/'
        : item.intent === 'navigate-search'
          ? '/buscar'
          : item.intent === 'navigate-contact'
            ? '/contacto'
            : '#';

  return (
    <a
      href={href}
      className="nav-item"
      data-node-id={item.id}
      data-node-type="agency"
      data-semantic-role="action"
      data-action-id={item.id}
      data-action-intent={item.intent}
      data-content-kind="action-label"
    >
      {item.label}
    </a>
  );
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="brand-logo">
        <BrandIdentityMark />
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <ul className="flex items-center gap-6">
          {siteNavigationFixture.items.map((item) => (
            <li key={item.id}>
              <NavigationAction item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
