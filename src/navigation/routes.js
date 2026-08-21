/**
 * Single map of semantic navigation intents → client routes.
 */
export const ROUTES = {
  home: '/',
  search: '/buscar',
  searchAlias: '/properties',
  restaurant: '/restaurante',
  about: '/about',
  contact: '/contacto',
  propertyDetail: (propertyId) => `/propiedad/${propertyId}`,
};

/** Intent → path used by Header Link and SemanticActionRouter. */
export const NAVIGATION_ROUTES = {
  'navigate-home': ROUTES.home,
  'navigate-search': ROUTES.search,
  'navigate-restaurant': ROUTES.restaurant,
  'navigate-about': ROUTES.about,
  'navigate-contact': ROUTES.contact,
};

export const NAVIGATION_INTENTS = new Set([
  ...Object.keys(NAVIGATION_ROUTES),
  'expand-detail',
]);
