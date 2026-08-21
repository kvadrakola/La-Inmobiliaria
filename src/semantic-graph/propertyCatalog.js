/**
 * Unified property lookup for Detail page.
 * Resolves semantic fixture ids (`property-001`) and listing mock ids (`1` / `listing-1`).
 */
import { LISTINGS } from '../data/listings.js';
import { propertyFixtures, agentFixtures } from './fixtures.js';

const DEFAULT_AGENT_ID = agentFixtures[0]?.id ?? 'agent-001';

/**
 * @param {string|undefined|null} agentId
 * @returns {import('./domainTypes.js').Agent|null}
 */
export function findAgentById(agentId) {
  if (agentId == null || agentId === '') return null;
  return agentFixtures.find((agent) => agent.id === agentId) ?? null;
}

/**
 * @param {object} listing
 * @returns {import('./domainTypes.js').Property & { legacyId: number, imageUrl?: string }}
 */
function adaptListingToProperty(listing) {
  const pad = String(listing.id).padStart(3, '0');
  const expensesIncluded = listing.badge === 'Gastos Incluidos';

  return {
    id: `listing-${listing.id}`,
    legacyId: listing.id,
    imageUrl: listing.imageUrl,
    title: listing.title,
    description: listing.description,
    contractType: 'vivienda-habitual',
    assignedAgentId: agentFixtures[(listing.id - 1) % agentFixtures.length]?.id ?? DEFAULT_AGENT_ID,
    address: {
      id: `address-listing-${pad}`,
      streetAddress: null,
      municipality: 'Madrid',
      region: 'Comunidad de Madrid',
      province: 'Madrid',
      postalCode: '28001',
      country: 'España',
    },
    financialSummary: {
      id: `financial-summary-listing-${pad}`,
      basePrice: {
        id: `price-listing-${pad}`,
        amount: listing.price,
        currency: 'EUR',
        period: 'month',
      },
      expensesIncluded,
      communityFees: null,
      taxObligation: null,
    },
    amenities: {
      id: `amenity-collection-listing-${pad}`,
      items: (listing.amenities ?? []).map((label, index) => ({
        id: `amenity-listing-${pad}-${String(index + 1).padStart(2, '0')}`,
        label,
      })),
    },
    media: listing.imageUrl
      ? [{ id: `media-listing-${pad}-01`, purpose: 'property-photograph', url: listing.imageUrl }]
      : [],
    compliance: {
      regionalRegistry: {
        id: `compliance-registry-listing-${pad}`,
        registryType: 'VUT',
        jurisdiction: 'ES-MD',
        syncStatus: 'unverified',
      },
      energyRating: { id: `compliance-cee-listing-${pad}`, rating: 'E' },
      dia: null,
      feeAgency: { id: `fee-agency-listing-${pad}`, payableBy: 'landlord' },
    },
    actions: {
      contactAgentActionId: `action-contact-agent-listing-${pad}`,
      requestViewingActionId: `action-request-viewing-listing-${pad}`,
      expandDetailActionId: `action-expand-detail-listing-${pad}`,
    },
  };
}

/** Listing mocks adapted to the semantic Property shape. */
export const listingProperties = LISTINGS.map(adaptListingToProperty);

/** @type {Array<import('./domainTypes.js').Property & { legacyId?: number, imageUrl?: string }>} */
export const propertyCatalog = [
  ...propertyFixtures.map((property) => ({ ...property, legacyId: undefined })),
  ...listingProperties,
];

/**
 * Route segment for a listing card id (numeric mock id or semantic id).
 * @param {string|number} listingId
 * @returns {string}
 */
export function toPropertyRouteId(listingId) {
  if (listingId == null) return '';
  const asString = String(listingId);
  if (asString.startsWith('property-') || asString.startsWith('listing-')) {
    return asString;
  }
  const numeric = Number(listingId);
  if (Number.isFinite(numeric) && numeric > 0) {
    return `listing-${numeric}`;
  }
  return asString;
}

/**
 * @param {string|number|undefined|null} propertyId
 * @returns {(import('./domainTypes.js').Property & { legacyId?: number, imageUrl?: string })|null}
 */
export function getPropertyById(propertyId) {
  if (propertyId == null || propertyId === '') return null;

  const key = String(propertyId);

  const byId = propertyCatalog.find((property) => property.id === key);
  if (byId) return byId;

  const numeric = Number(key);
  if (Number.isFinite(numeric) && numeric > 0) {
    const byLegacy = propertyCatalog.find((property) => property.legacyId === numeric);
    if (byLegacy) return byLegacy;
  }

  return null;
}
