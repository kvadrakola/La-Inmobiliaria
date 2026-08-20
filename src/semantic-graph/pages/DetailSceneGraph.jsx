/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Source order is authoritative for reading sequence, keyboard/focus
 * order, and narrative sequence only. It does not prescribe coordinates,
 * columns, alignment, proximity, size, or visual prominence. Business
 * importance is carried exclusively by data-business-priority, never by
 * position.
 *
 * Detail stub — a single PropertyListing rendered at 'complete' content
 * depth: full address, full financial breakdown, full amenity
 * collection, media, every applicable compliance record (regional
 * registry, CEE, and the DIA for this Andalusian property), and actions.
 */
import { useParams } from 'react-router-dom';
import { SiteHeader, SiteFooter } from '../nodes/SiteChrome.jsx';
import { PropertyListing } from '../nodes/PropertyNodes.jsx';
import { propertyFixtures } from '../fixtures.js';

export default function DetailSceneGraph() {
  const { propertyId } = useParams();
  const property =
    propertyFixtures.find((item) => item.id === propertyId) ?? propertyFixtures[0];

  return (
    <div
      data-scene-schema="proptech-semantic-graph"
      data-scene-version="1.0.0"
      data-locale="es-ES"
      data-node-id="detail-page-001"
      data-node-type="page"
      data-semantic-role="entity"
    >
      <SiteHeader />
      <main>
        <PropertyListing property={property} contentDepth="complete" />
      </main>
      <SiteFooter />
    </div>
  );
}
