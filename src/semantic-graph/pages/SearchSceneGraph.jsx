/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Source order is authoritative for reading sequence, keyboard/focus
 * order, and narrative sequence only. It does not prescribe coordinates,
 * columns, alignment, proximity, size, or visual prominence. Business
 * importance is carried exclusively by data-business-priority, never by
 * position.
 *
 * Search page ("Vitrina" full results) — PropertySearchResults over the
 * full listing pool, with each listing rendered at 'summary' content
 * depth (fuller than Home's teaser, lighter than the Detail stub).
 */
import { SiteHeader, SiteFooter } from '../nodes/SiteChrome.jsx';
import { PropertySearchCriteriaSummary, PropertySearchResults } from '../nodes/SearchNodes.jsx';
import { propertyFixtures, searchCriteriaFixture } from '../fixtures.js';

export default function SearchSceneGraph() {
  return (
    <div
      data-scene-schema="proptech-semantic-graph"
      data-scene-version="1.0.0"
      data-locale="es-ES"
      data-node-id="search-page-001"
      data-node-type="page"
      data-semantic-role="entity"
    >
      <SiteHeader />
      <main>
        <PropertySearchCriteriaSummary criteria={searchCriteriaFixture} />
        <PropertySearchResults properties={propertyFixtures} />
      </main>
      <SiteFooter />
    </div>
  );
}
