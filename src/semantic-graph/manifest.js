/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * SCENE_GRAPH_MANIFEST — a plain object indexing every data-node-id used
 * anywhere in the JSX (across Home, Search, and Detail) with its
 * data-node-type, data-semantic-role, and outgoing data-ref/data-rel
 * edges, so a downstream agent can query the graph without walking the
 * DOM.
 *
 * This module derives entries directly from the same fixtures the JSX
 * renders from (see ./fixtures.js), mirroring each component's id
 * derivation rules 1:1, so the manifest cannot drift from what is
 * actually rendered. A node is included here if and only if it is
 * rendered on at least one of the three pages.
 */
import { agencyFixture, agentFixtures, propertyFixtures, siteNavigationFixture, legalDocumentCollectionFixture, paymentMethodFixture, searchCriteriaFixture } from './fixtures.js';

function entry(nodeType, semanticRole, refs = []) {
  return { nodeType, semanticRole, refs };
}

function findAgent(agentId) {
  return agentFixtures.find((agent) => agent.id === agentId);
}

/**
 * Builds every manifest entry owned by one PropertyListing, given which
 * content depths that property is actually rendered at across the three
 * pages (teaser on Home, summary on Search results, complete only for
 * the Detail stub's single featured property).
 */
function buildPropertyEntries(property, { rendersSummary, rendersComplete }) {
  const p = property.id;
  const fs = property.financialSummary;
  const addr = property.address;
  const entries = {
    [p]: entry('property', 'entity', [{ ref: 'agency-001', rel: 'belongs-to' }]),
    [`${p}-title`]: entry('property', 'field'),
    [addr.id]: entry('address', 'entity', [{ ref: p, rel: 'locates' }]),
    [`${addr.id}-municipality`]: entry('address', 'field'),
    [`${addr.id}-region`]: entry('address', 'field'),
    [fs.id]: entry('financial-summary', 'entity', [{ ref: p, rel: 'prices' }]),
    [fs.basePrice.id]: entry('financial-summary', 'field'),
    [property.compliance.energyRating.id]: entry('compliance-record', 'status', [{ ref: p, rel: 'validates' }]),
  };

  if (fs.expensesIncluded) {
    entries[`${fs.basePrice.id}-expenses-included`] = entry('financial-summary', 'status');
  }

  const rendersNonTeaser = rendersSummary || rendersComplete;

  if (rendersNonTeaser) {
    Object.assign(entries, {
      [`${p}-description`]: entry('property', 'field'),
      [`${addr.id}-street`]: entry('address', 'field'),
      [`${addr.id}-postal-code`]: entry('address', 'field'),
      [fs.communityFees ? fs.communityFees.id : `${fs.id}-community-fees`]: entry('financial-summary', 'field'),
      [fs.taxObligation ? fs.taxObligation.id : `${fs.id}-tax-obligation`]: entry('financial-summary', 'field'),
      [property.amenities.id]: entry('amenity', 'collection', [{ ref: p, rel: 'belongs-to' }]),
      [property.compliance.regionalRegistry.id]: entry('compliance-record', 'assertion', [{ ref: p, rel: 'validates' }]),
      [`${property.compliance.regionalRegistry.id}-label`]: entry('compliance-record', 'field'),
      [`${property.compliance.regionalRegistry.id}-sync-status`]: entry('compliance-record', 'status'),
      [property.compliance.feeAgency.id]: entry('fee-agency', 'assertion', [{ ref: p, rel: 'prices' }]),
      [property.actions.contactAgentActionId]: entry('agent', 'action', [
        { ref: findAgent(property.assignedAgentId).id, rel: 'belongs-to' },
      ]),
      [property.actions.requestViewingActionId]: entry('property', 'action', [{ ref: p, rel: 'belongs-to' }]),
    });

    if (property.amenities.items.length > 0) {
      property.amenities.items.forEach((item) => {
        entries[item.id] = entry('amenity', 'field');
      });
    } else {
      entries[`${property.amenities.id}-placeholder`] = entry('amenity', 'status');
    }
  }

  // Every property is rendered as a Home teaser, which always mounts
  // ExpandDetailAction, independent of whichever other depths it also
  // reaches on the Search or Detail pages.
  entries[property.actions.expandDetailActionId] = entry('property', 'action', [{ ref: p, rel: 'belongs-to' }]);

  if (rendersComplete) {
    entries[`property-media-${p}`] = entry('media-asset', 'collection', [{ ref: p, rel: 'belongs-to' }]);
    property.media.forEach((asset) => {
      entries[asset.id] = entry('media-asset', 'field');
    });

    if (property.compliance.dia) {
      const dia = property.compliance.dia;
      Object.assign(entries, {
        [dia.id]: entry('compliance-record', 'assertion', [{ ref: p, rel: 'documents' }]),
        [`${dia.id}-notice`]: entry('compliance-record', 'assertion'),
        [dia.usableArea.id]: entry('property-metric', 'field'),
        [dia.builtArea.id]: entry('property-metric', 'field'),
        [dia.communityExpenses.id]: entry('financial-summary', 'field'),
        [dia.ibi.id]: entry('financial-summary', 'field'),
        [dia.downloadActionId]: entry('compliance-record', 'action', [{ ref: dia.id, rel: 'documents' }]),
      });
    }
  }

  return entries;
}

const [propertyOne, propertyTwo, propertyThree] = propertyFixtures;

export const SCENE_GRAPH_MANIFEST = {
  // ── Pages ──────────────────────────────────────────────────────────
  'home-page-001': entry('page', 'entity'),
  'search-page-001': entry('page', 'entity'),
  'detail-page-001': entry('page', 'entity'),

  // ── Site chrome (shared header/footer, same entity on every page) ──
  [`${agencyFixture.id}-brand-mark`]: entry('agency', 'field', [{ ref: agencyFixture.id, rel: 'belongs-to' }]),
  [siteNavigationFixture.id]: entry('agency', 'collection'),
  ...Object.fromEntries(siteNavigationFixture.items.map((item) => [item.id, entry('agency', 'action')])),
  'agency-contact-point-001': entry('contact-point', 'entity', [{ ref: agencyFixture.id, rel: 'belongs-to' }]),
  'agency-contact-point-001-phone': entry('contact-point', 'field'),
  'agency-contact-point-001-email': entry('contact-point', 'field'),
  'agency-contact-point-001-address': entry('contact-point', 'field'),
  [paymentMethodFixture.id]: entry('payment-method', 'assertion'),
  [paymentMethodFixture.bizumAssetId]: entry('media-asset', 'field'),
  [`${paymentMethodFixture.id}-policy-statement`]: entry('payment-method', 'status'),
  [agencyFixture.professionalCredential.id]: entry('compliance-record', 'assertion'),
  [legalDocumentCollectionFixture.id]: entry('compliance-record', 'collection'),
  ...Object.fromEntries(legalDocumentCollectionFixture.items.map((item) => [item.id, entry('compliance-record', 'action')])),

  // ── Home: Agency History ────────────────────────────────────────────
  [agencyFixture.id]: entry('agency', 'entity'),
  [`${agencyFixture.id}-trade-name`]: entry('agency', 'field'),
  [`${agencyFixture.id}-mission`]: entry('agency', 'field'),
  [`${agencyFixture.id}-history`]: entry('agency', 'field'),
  [`${agencyFixture.id}-founding-year`]: entry('agency', 'field'),
  'action-navigate-search-from-intro-001': entry('agency', 'action'),

  // ── Home: Team / Agent profiles ──────────────────────────────────────
  'team-member-collection-001': entry('agent', 'collection', [{ ref: agencyFixture.id, rel: 'belongs-to' }]),
  'team-member-collection-001-heading': entry('agent', 'field'),
  ...Object.fromEntries(
    agentFixtures.flatMap((agent) => [
      [agent.id, entry('agent', 'entity', [{ ref: agencyFixture.id, rel: 'belongs-to' }])],
      [agent.portraitAssetId, entry('media-asset', 'field')],
      [`${agent.id}-name`, entry('agent', 'field')],
      [`${agent.id}-role`, entry('agent', 'field')],
      [`${agent.id}-bio`, entry('agent', 'field')],
    ]),
  ),

  // ── Home: Property Showcase ("Vitrina") ──────────────────────────────
  'featured-listing-collection-001': entry('property', 'collection'),
  'featured-listing-collection-001-heading': entry('property', 'field'),
  'action-navigate-search-from-showcase-001': entry('property', 'action'),

  // ── Search: applied criteria + full results ──────────────────────────
  [searchCriteriaFixture.id]: entry('property', 'assertion', [{ ref: 'property-search-results-001', rel: 'belongs-to' }]),
  [`${searchCriteriaFixture.id}-municipality`]: entry('address', 'field'),
  [searchCriteriaFixture.maxPrice.id]: entry('financial-summary', 'field'),
  'property-search-results-001': entry('property', 'collection'),
  'property-search-results-001-heading': entry('property', 'field'),

  // ── PropertyListing entities and their full ownership subtrees ──────
  // property-001: rendered as teaser (Home), summary (Search), complete (Detail stub).
  ...buildPropertyEntries(propertyOne, { rendersSummary: true, rendersComplete: true }),
  // property-002: rendered as teaser (Home) and summary (Search) only.
  ...buildPropertyEntries(propertyTwo, { rendersSummary: true, rendersComplete: false }),
  // property-003: rendered as teaser (Home) and summary (Search) only.
  ...buildPropertyEntries(propertyThree, { rendersSummary: true, rendersComplete: false }),
};

export default SCENE_GRAPH_MANIFEST;
