/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Domain shape definitions for the Core Funnel (Home, Search/"Vitrina",
 * Detail stub) of the real-estate platform.
 *
 * These are documentation-only shapes (JSDoc typedefs) describing the
 * content instances consumed by the semantic node components. They carry
 * no geometry, styling, or layout information — only what a thing *is*.
 *
 * @typedef {Object} MonetaryAmount
 * @property {string} id
 * @property {number} amount
 * @property {'EUR'} currency
 * @property {'month'|'year'|'one-time'} period
 *
 * @typedef {Object} PostalAddress
 * @property {string} id
 * @property {string|null} streetAddress
 * @property {string} municipality
 * @property {string} region
 * @property {string} province
 * @property {string} postalCode
 * @property {string} country
 *
 * @typedef {Object} Amenity
 * @property {string} id
 * @property {string} label
 *
 * @typedef {Object} AmenityCollection
 * @property {string} id
 * @property {Amenity[]} items
 *
 * @typedef {Object} FinancialSummary
 * @property {string} id
 * @property {MonetaryAmount} basePrice
 * @property {boolean} expensesIncluded
 * @property {MonetaryAmount|null} communityFees
 * @property {MonetaryAmount|null} taxObligation
 *
 * @typedef {Object} RegionalRegistryRecord
 * @property {string} id
 * @property {'RTA'|'HUT'|'VUT'} registryType
 * @property {string} jurisdiction
 * @property {'pending'|'unverified'} syncStatus
 * @property {boolean} [syncError]
 *
 * @typedef {Object} EnergyRatingRecord
 * @property {string} id
 * @property {'A'|'B'|'C'|'D'|'E'|'F'|'G'} rating
 *
 * @typedef {Object} AbbreviatedInformationRecord (DIA — Decreto 218/2005)
 * @property {string} id
 * @property {string} jurisdiction
 * @property {{ id: string, value: number, unit: string }} usableArea
 * @property {{ id: string, value: number, unit: string }} builtArea
 * @property {MonetaryAmount} communityExpenses
 * @property {MonetaryAmount} ibi
 * @property {string} downloadActionId
 *
 * @typedef {Object} AgencyFeeRecord
 * @property {string} id
 * @property {'landlord'|'tenant'|'negotiable'} payableBy
 *
 * @typedef {Object} PropertyCompliance
 * @property {RegionalRegistryRecord} regionalRegistry
 * @property {EnergyRatingRecord} energyRating
 * @property {AbbreviatedInformationRecord|null} dia
 * @property {AgencyFeeRecord} feeAgency
 *
 * @typedef {Object} PropertyActions
 * @property {string} contactAgentActionId
 * @property {string} requestViewingActionId
 * @property {string} expandDetailActionId
 * @property {boolean} [requestViewingLoading]
 *
 * @typedef {Object} Property
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'vivienda-habitual'|'temporal'|'comercial'} contractType
 * @property {string} assignedAgentId
 * @property {PostalAddress} address
 * @property {FinancialSummary} financialSummary
 * @property {AmenityCollection} amenities
 * @property {{ id: string, purpose: string }[]} media
 * @property {PropertyCompliance} compliance
 * @property {PropertyActions} actions
 *
 * @typedef {Object} Agent
 * @property {string} id
 * @property {string} name
 * @property {string} role
 * @property {string} bio
 * @property {string} contactPhone
 * @property {string} contactEmail
 * @property {string} portraitAssetId
 *
 * @typedef {Object} Agency
 * @property {string} id
 * @property {string} legalName
 * @property {string} tradeName
 * @property {number} foundingYear
 * @property {string} missionStatement
 * @property {string} historyNarrative
 * @property {string} contactPhone
 * @property {string} contactEmail
 * @property {PostalAddress} address
 * @property {{ id: string, registrationNumber: string, jurisdiction: string }} professionalCredential
 * @property {{ id: string }} bizumAsset
 */

/** Closed vocabulary — internal consistency helpers, not new data- attributes. */
export const CEE_RATINGS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
export const REGIONAL_REGISTRY_TYPES = ['RTA', 'HUT', 'VUT'];
export const CONTRACT_TYPES = ['vivienda-habitual', 'temporal', 'comercial'];
export const CONTENT_DEPTHS = ['teaser', 'summary', 'complete'];
