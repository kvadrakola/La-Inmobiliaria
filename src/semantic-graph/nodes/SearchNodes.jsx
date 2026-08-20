/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Search/"Vitrina" content: the applied search criteria (assertion) and
 * the resulting listing collections for the Home teaser and the Search
 * results page.
 */
import { PropertyListing } from './PropertyNodes.jsx';
import { CollectionHeading } from './AgencyNodes.jsx';

export function PropertySearchCriteriaSummary({ criteria }) {
  return (
    <section
      data-node-id={criteria.id}
      data-node-type="property"
      data-semantic-role="assertion"
      data-business-priority="low"
      data-ref="property-search-results-001"
      data-rel="belongs-to"
    >
      <p
        data-node-id={`${criteria.id}-municipality`}
        data-node-type="address"
        data-semantic-role="field"
        data-concept-id="search-municipality"
        data-content-kind="text"
        data-content-source="api"
        data-required="false"
      >
        Ubicación: {criteria.municipality}
      </p>
      <p
        data-node-id={criteria.maxPrice.id}
        data-node-type="financial-summary"
        data-semantic-role="field"
        data-concept-id="search-max-price"
        data-content-kind="price"
        data-content-source="api"
        data-required="false"
      >
        Precio máximo: {criteria.maxPrice.amount} {criteria.maxPrice.currency}/mes
      </p>
    </section>
  );
}

export function PropertySearchResults({ properties }) {
  return (
    <section
      data-node-id="property-search-results-001"
      data-node-type="property"
      data-semantic-role="collection"
      data-cardinality="0..48"
      data-required="true"
      data-empty-state="show-placeholder"
    >
      <CollectionHeading nodeId="property-search-results-001-heading" nodeType="property">
        Resultados de Búsqueda
      </CollectionHeading>
      {properties.map((property) => (
        <PropertyListing key={property.id} property={property} contentDepth="summary" />
      ))}
    </section>
  );
}

export function FeaturedListingCollection({ properties }) {
  return (
    <section
      data-node-id="featured-listing-collection-001"
      data-node-type="property"
      data-semantic-role="collection"
      data-cardinality="3..12"
      data-required="true"
      data-business-priority="critical"
    >
      <CollectionHeading nodeId="featured-listing-collection-001-heading" nodeType="property">
        Vitrina de Propiedades
      </CollectionHeading>
      {properties.map((property) => (
        <PropertyListing key={property.id} property={property} contentDepth="teaser" />
      ))}
      <button
        type="button"
        data-node-id="action-navigate-search-from-showcase-001"
        data-node-type="property"
        data-semantic-role="action"
        data-action-id="action-navigate-search-from-showcase-001"
        data-action-intent="navigate-search"
        data-content-kind="action-label"
        data-required="false"
      >
        Ver Todas las Propiedades
      </button>
    </section>
  );
}
