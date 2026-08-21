/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Typed fixture instances (see ./domainTypes.js for shapes). All content
 * here is demo/fixture data, never a claim of legal fact — every node
 * rendered from these fixtures MUST be marked
 * data-record-status="fixture" / data-verification-status="unverified"
 * where the Metadata Contract calls for those attributes.
 *
 * Every nested object carries its own stable `id`. Node components read
 * ids from here rather than inventing strings inline, so the JSX and the
 * SCENE_GRAPH_MANIFEST (see ./manifest.js) cannot drift apart.
 */

/** @type {import('./domainTypes.js').Agency} */
export const agencyFixture = {
  id: 'agency-001',
  legalName: 'HabitaFactoría S.L.',
  tradeName: 'HabitaFactoría',
  foundingYear: 2018,
  missionStatement:
    'Desde 2018 acompañamos a estudiantes e inquilinos en la búsqueda de un alquiler transparente en España, sin comisiones ocultas y con contratos claros bajo el marco normativo vigente.',
  historyNarrative:
    'Fundada en Madrid en 2018 por un equipo de gestores inmobiliarios especializados en vivienda para estudiantes, HabitaFactoría ha ampliado su cartera a Andalucía y Cataluña, manteniendo el mismo compromiso: alquileres con "Gastos Incluidos" y cumplimiento normativo verificable en cada comunidad autónoma en la que opera.',
  contactPhone: '+34 600 123 456',
  contactEmail: 'info@habitafactoria.es',
  address: {
    id: 'address-agency-001',
    streetAddress: 'Calle Ejemplo, 12, 3º B',
    municipality: 'Madrid',
    region: 'Comunidad de Madrid',
    province: 'Madrid',
    postalCode: '28001',
    country: 'España',
  },
  professionalCredential: {
    id: 'compliance-agency-credential-001',
    registrationNumber: 'HF-2024-001',
    jurisdiction: 'ES',
  },
  bizumAsset: {
    id: 'media-bizum-mark-001',
  },
};

/** @type {import('./domainTypes.js').Agent[]} */
export const agentFixtures = [
  {
    id: 'agent-001',
    name: 'Jesús González',
    role: 'Agente Senior',
    bio: 'Especialista en habitaciones para estudiantes, te ayuda a encontrar un hogar cómodo y bien ubicado.',
    contactPhone: '+34 600 111 222',
    contactEmail: 'jesus.gonzalez@habitafactoria.es',
    portraitAssetId: 'fotoJesus.jpg',
  },
  {
    id: 'agent-002',
    name: 'Jose Loero',
    role: 'Agente de Alquileres',
    bio: 'Gestiona habitaciones para estudiantes y coordina alquileres sencillos durante el curso académico.',
    contactPhone: '+34 600 333 444',
    contactEmail: 'jose.loero@habitafactoria.es',
    portraitAssetId: 'fotoJose.webp',
  },
  {
    id: 'agent-003',
    name: 'María José Rodriguez',
    role: 'Asesora Estudiantil',
    bio: 'Asesora a estudiantes en la búsqueda de habitaciones y les acompaña durante todo el alquiler.',
    contactPhone: '+34 600 555 666',
    contactEmail: 'maria.jose.rodriguez@habitafactoria.es',
    portraitAssetId: 'fotoMariaJose.webp',
  },
  {
    id: 'agent-004',
    name: 'Moisés García',
    role: 'Agente de Alquileres',
    bio: 'Ayuda a estudiantes a encontrar habitaciones prácticas y bien ubicadas para el curso académico.',
    contactPhone: '+34 600 777 888',
    contactEmail: 'moises.garcia@habitafactoria.es',
    portraitAssetId: 'fotoMoises.webp',
  },
  {
    id: 'agent-005',
    name: 'Kanstantsin Mlechka',
    role: 'Asesor Estudiantil',
    bio: 'Acompaña a estudiantes en la búsqueda de habitación y durante todo el proceso de alquiler.',
    contactPhone: '+34 600 999 000',
    contactEmail: 'kanstantsin.mlechka@habitafactoria.es',
    portraitAssetId: 'fotoKonsta.JPG',
  },
];

/** @type {import('./domainTypes.js').Property[]} */
export const propertyFixtures = [
  {
    // Full/rich listing — Andalusia, long toponym, exercises DIA + 12+ amenities + inseparable price fact.
    id: 'property-001',
    title: 'Habitación luminosa cerca del centro histórico',
    description:
      'Habitación amplia y luminosa en vivienda compartida, a cinco minutos del centro histórico. Ideal para estudiantes de intercambio o investigadores de estancia larga.',
    contractType: 'vivienda-habitual',
    assignedAgentId: 'agent-001',
    address: {
      id: 'address-property-001',
      streetAddress: 'Calle Real, 8, 2º A',
      municipality: 'Villamanrique de la Condesa',
      region: 'Andalucía',
      province: 'Sevilla',
      postalCode: '41850',
      country: 'España',
    },
    financialSummary: {
      id: 'financial-summary-001',
      basePrice: { id: 'price-001', amount: 620, currency: 'EUR', period: 'month' },
      expensesIncluded: true,
      communityFees: { id: 'community-fees-001', amount: 45, currency: 'EUR', period: 'month' },
      taxObligation: { id: 'tax-obligation-001', amount: 180, currency: 'EUR', period: 'year' },
    },
    amenities: {
      id: 'amenity-collection-001',
      items: [
        { id: 'amenity-001-01', label: 'Wifi de alta velocidad' },
        { id: 'amenity-001-02', label: 'Calefacción central' },
        { id: 'amenity-001-03', label: 'Aire acondicionado' },
        { id: 'amenity-001-04', label: 'Lavadora' },
        { id: 'amenity-001-05', label: 'Cocina totalmente equipada' },
        { id: 'amenity-001-06', label: 'Terraza privada' },
        { id: 'amenity-001-07', label: 'Ascensor' },
        { id: 'amenity-001-08', label: 'Habitación amueblada' },
        { id: 'amenity-001-09', label: 'Se permiten mascotas' },
        { id: 'amenity-001-10', label: 'Trastero incluido' },
        { id: 'amenity-001-11', label: 'Plaza de garaje opcional' },
        { id: 'amenity-001-12', label: 'Zona de estudio compartida' },
        { id: 'amenity-001-13', label: 'Ropa de cama incluida' },
        { id: 'amenity-001-14', label: 'Limpieza semanal de zonas comunes' },
      ],
    },
    media: [{ id: 'media-property-001-01', purpose: 'property-photograph' }],
    compliance: {
      regionalRegistry: {
        id: 'compliance-registry-001',
        registryType: 'RTA',
        jurisdiction: 'ES-AN',
        syncStatus: 'pending',
      },
      energyRating: { id: 'compliance-cee-001', rating: 'D' },
      dia: {
        id: 'compliance-dia-001',
        jurisdiction: 'ES-AN',
        usableArea: { id: 'field-superficie-util-001', value: 18, unit: 'm²' },
        builtArea: { id: 'field-superficie-construida-001', value: 22, unit: 'm²' },
        communityExpenses: { id: 'field-gastos-comunidad-001', amount: 45, currency: 'EUR', period: 'month' },
        ibi: { id: 'field-ibi-001', amount: 180, currency: 'EUR', period: 'year' },
        downloadActionId: 'action-download-dia-001',
      },
      feeAgency: { id: 'fee-agency-001', payableBy: 'landlord' },
    },
    actions: {
      contactAgentActionId: 'action-contact-agent-001',
      requestViewingActionId: 'action-request-viewing-001',
      expandDetailActionId: 'action-expand-detail-001',
    },
  },
  {
    // Incomplete listing — Madrid, temporal contract, 0 amenities, several omitted optional fields.
    id: 'property-002',
    title: 'Estudio funcional en Moncloa',
    description: 'Estudio compacto cerca de la zona universitaria, disponible para estancias de temporada.',
    contractType: 'temporal',
    assignedAgentId: 'agent-002',
    address: {
      id: 'address-property-002',
      streetAddress: null,
      municipality: 'Madrid',
      region: 'Comunidad de Madrid',
      province: 'Madrid',
      postalCode: '28040',
      country: 'España',
    },
    financialSummary: {
      id: 'financial-summary-002',
      basePrice: { id: 'price-002', amount: 550, currency: 'EUR', period: 'month' },
      expensesIncluded: false,
      communityFees: null,
      taxObligation: null,
    },
    amenities: { id: 'amenity-collection-002', items: [] },
    media: [],
    compliance: {
      regionalRegistry: {
        id: 'compliance-registry-002',
        registryType: 'VUT',
        jurisdiction: 'ES-MD',
        syncStatus: 'unverified',
      },
      energyRating: { id: 'compliance-cee-002', rating: 'F' },
      dia: null,
      feeAgency: { id: 'fee-agency-002', payableBy: 'negotiable' },
    },
    actions: {
      contactAgentActionId: 'action-contact-agent-002',
      requestViewingActionId: 'action-request-viewing-002',
      expandDetailActionId: 'action-expand-detail-002',
    },
  },
  {
    // Barcelona listing — exercises loading (viewing) + error (registry sync) logic variants.
    id: 'property-003',
    title: 'Habitación en piso compartido con terraza',
    description:
      'Habitación individual en piso compartido con tres estudiantes internacionales, terraza común y buena conexión con el campus.',
    contractType: 'comercial',
    assignedAgentId: 'agent-003',
    address: {
      id: 'address-property-003',
      streetAddress: 'Carrer de Mallorca, 214, 3º 2ª',
      municipality: 'Barcelona',
      region: 'Cataluña',
      province: 'Barcelona',
      postalCode: '08036',
      country: 'España',
    },
    financialSummary: {
      id: 'financial-summary-003',
      basePrice: { id: 'price-003', amount: 495, currency: 'EUR', period: 'month' },
      expensesIncluded: true,
      communityFees: { id: 'community-fees-003', amount: 30, currency: 'EUR', period: 'month' },
      taxObligation: null,
    },
    amenities: {
      id: 'amenity-collection-003',
      items: [
        { id: 'amenity-003-01', label: 'Wifi de alta velocidad' },
        { id: 'amenity-003-02', label: 'Terraza compartida' },
        { id: 'amenity-003-03', label: 'Lavadora' },
        { id: 'amenity-003-04', label: 'Habitación amueblada' },
        { id: 'amenity-003-05', label: 'Calefacción' },
      ],
    },
    media: [{ id: 'media-property-003-01', purpose: 'property-photograph' }],
    compliance: {
      regionalRegistry: {
        id: 'compliance-registry-003',
        registryType: 'HUT',
        jurisdiction: 'ES-CT',
        syncStatus: 'pending',
        syncError: true,
      },
      energyRating: { id: 'compliance-cee-003', rating: 'B' },
      dia: null,
      feeAgency: { id: 'fee-agency-003', payableBy: 'tenant' },
    },
    actions: {
      contactAgentActionId: 'action-contact-agent-003',
      requestViewingActionId: 'action-request-viewing-003',
      expandDetailActionId: 'action-expand-detail-003',
      requestViewingLoading: true,
    },
  },
];

export const siteNavigationFixture = {
  id: 'site-navigation-001',
  items: [
    { id: 'nav-action-home-001', label: 'Inicio', intent: 'navigate-home' },
    { id: 'nav-action-search-001', label: 'Propiedades', intent: 'navigate-search' },
    { id: 'nav-action-restaurante-001', label: 'Restaurante', intent: 'navigate-restaurant', dividerBefore: true },
    { id: 'nav-action-about-001', label: 'Sobre Nosotros', intent: 'navigate-about' },
    { id: 'nav-action-contact-001', label: 'Contacto', intent: 'navigate-contact' },
  ],
};

export const legalDocumentCollectionFixture = {
  id: 'legal-document-collection-001',
  items: [
    { id: 'action-view-privacy-001', label: 'Política de Privacidad' },
    { id: 'action-view-terms-001', label: 'Términos y Condiciones' },
  ],
};

export const paymentMethodFixture = {
  id: 'payment-method-assertion-001',
  bizumAssetId: 'media-bizum-mark-001',
  policyStatement: 'Sin comisiones ocultas',
};

export const searchCriteriaFixture = {
  id: 'search-criteria-001',
  municipality: 'Madrid, Barcelona, Sevilla',
  maxPrice: { id: 'search-criteria-001-max-price', amount: 700, currency: 'EUR', period: 'month' },
};
