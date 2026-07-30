/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * PropertyListing and its true ownership tree: PostalAddress,
 * FinancialSummary, AmenityCollection, media, Spain proptech compliance
 * records (regional registry / CEE / DIA / agency-fee), and the actions a
 * listing exposes.
 *
 * `contentDepth` ('teaser' | 'summary' | 'complete') is a content-scope
 * decision (how much of this entity's real content belongs in a given
 * page context — Home teaser vs. Search result vs. Detail stub) and
 * carries no visual instruction; Penpot still decides size/placement for
 * whatever subset of nodes is present.
 */
import { agentFixtures } from '../fixtures.js';

const PERIOD_LABEL = { month: '/mes', year: '/año', 'one-time': '' };

function findAgent(agentId) {
  return agentFixtures.find((agent) => agent.id === agentId);
}

function PostalAddressField({ address, propertyId, contentDepth }) {
  return (
    <address
      data-node-id={address.id}
      data-node-type="address"
      data-semantic-role="entity"
      data-locale="es-ES"
      data-ref={propertyId}
      data-rel="locates"
    >
      {contentDepth !== 'teaser' &&
        (address.streetAddress ? (
          <span
            data-node-id={`${address.id}-street`}
            data-node-type="address"
            data-semantic-role="field"
            data-concept-id="street-address"
            data-content-kind="address"
            data-content-source="fixture"
            data-required="false"
          >
            {address.streetAddress}
          </span>
        ) : (
          <span
            data-node-id={`${address.id}-street`}
            data-node-type="address"
            data-semantic-role="field"
            data-concept-id="street-address"
            data-content-kind="address"
            data-required="false"
            data-empty-state="hide-field"
          >
            Dirección exacta no publicada
          </span>
        ))}
      <span
        data-node-id={`${address.id}-municipality`}
        data-node-type="address"
        data-semantic-role="field"
        data-concept-id="municipality"
        data-content-kind="address"
        data-content-source="fixture"
        data-required="true"
        data-min-length="2"
        data-max-length="unbounded"
      >
        {address.municipality}
      </span>
      <span
        data-node-id={`${address.id}-region`}
        data-node-type="address"
        data-semantic-role="field"
        data-concept-id="region"
        data-content-kind="address"
        data-content-source="fixture"
        data-required="true"
      >
        {address.region}
      </span>
      {contentDepth !== 'teaser' && (
        <span
          data-node-id={`${address.id}-postal-code`}
          data-node-type="address"
          data-semantic-role="field"
          data-concept-id="postal-code"
          data-content-kind="text"
          data-content-source="fixture"
          data-required="true"
        >
          {address.postalCode}
        </span>
      )}
    </address>
  );
}

function FinancialSummary({ financialSummary, propertyId, contentDepth }) {
  const period = PERIOD_LABEL[financialSummary.basePrice.period];
  return (
    <div data-node-id={financialSummary.id} data-node-type="financial-summary" data-semantic-role="entity" data-ref={propertyId} data-rel="prices">
      <p
        data-node-id={financialSummary.basePrice.id}
        data-node-type="financial-summary"
        data-semantic-role="field"
        data-concept-id="monthly-rent"
        data-content-kind="price"
        data-content-source="fixture"
        data-required="true"
        data-business-priority="critical"
        {...(financialSummary.expensesIncluded ? { 'data-inseparable-fact': 'true' } : {})}
      >
        {financialSummary.basePrice.amount} {financialSummary.basePrice.currency} {period}
        {financialSummary.expensesIncluded && (
          <span
            data-node-id={`${financialSummary.basePrice.id}-expenses-included`}
            data-node-type="financial-summary"
            data-semantic-role="status"
            data-concept-id="expenses-included-qualifier"
            data-content-kind="status-label"
            data-inseparable-fact="true"
          >
            Gastos Incluidos
          </span>
        )}
      </p>

      {contentDepth !== 'teaser' &&
        (financialSummary.communityFees ? (
          <p
            data-node-id={financialSummary.communityFees.id}
            data-node-type="financial-summary"
            data-semantic-role="field"
            data-concept-id="community-fees"
            data-content-kind="price"
            data-content-source="fixture"
            data-required="false"
          >
            Comunidad: {financialSummary.communityFees.amount} {financialSummary.communityFees.currency}/mes
          </p>
        ) : (
          <p
            data-node-id={`${financialSummary.id}-community-fees`}
            data-node-type="financial-summary"
            data-semantic-role="field"
            data-concept-id="community-fees"
            data-content-kind="price"
            data-required="false"
            data-empty-state="hide-field"
          >
            Gastos de comunidad no especificados
          </p>
        ))}

      {contentDepth !== 'teaser' &&
        (financialSummary.taxObligation ? (
          <p
            data-node-id={financialSummary.taxObligation.id}
            data-node-type="financial-summary"
            data-semantic-role="field"
            data-concept-id="ibi"
            data-content-kind="price"
            data-content-source="fixture"
            data-required="false"
          >
            IBI: {financialSummary.taxObligation.amount} {financialSummary.taxObligation.currency}/año
          </p>
        ) : (
          <p
            data-node-id={`${financialSummary.id}-tax-obligation`}
            data-node-type="financial-summary"
            data-semantic-role="field"
            data-concept-id="ibi"
            data-content-kind="price"
            data-required="false"
            data-empty-state="hide-field"
          >
            IBI no especificado
          </p>
        ))}
    </div>
  );
}

function AmenityCollection({ amenities, propertyId }) {
  const hasItems = amenities.items.length > 0;
  return (
    <ul
      data-node-id={amenities.id}
      data-node-type="amenity"
      data-semantic-role="collection"
      data-cardinality="0..40"
      data-required="false"
      data-ref={propertyId}
      data-rel="belongs-to"
      {...(!hasItems ? { 'data-empty-state': 'show-placeholder' } : {})}
    >
      {hasItems ? (
        amenities.items.map((item) => (
          <li
            key={item.id}
            data-node-id={item.id}
            data-node-type="amenity"
            data-semantic-role="field"
            data-concept-id="property-amenity"
            data-content-kind="text"
            data-content-source="fixture"
            data-required="false"
          >
            {item.label}
          </li>
        ))
      ) : (
        <li
          data-node-id={`${amenities.id}-placeholder`}
          data-node-type="amenity"
          data-semantic-role="status"
          data-content-kind="text"
          data-empty-state="show-placeholder"
        >
          Sin comodidades adicionales registradas para esta propiedad.
        </li>
      )}
    </ul>
  );
}

function MediaAssetList({ media, propertyId }) {
  if (media.length === 0) {
    return (
      <div
        data-node-id={`property-media-${propertyId}`}
        data-node-type="media-asset"
        data-semantic-role="collection"
        data-cardinality="0..20"
        data-required="false"
        data-empty-state="show-placeholder"
        data-ref={propertyId}
        data-rel="belongs-to"
      >
        Fotografías no disponibles todavía.
      </div>
    );
  }
  return (
    <div
      data-node-id={`property-media-${propertyId}`}
      data-node-type="media-asset"
      data-semantic-role="collection"
      data-cardinality="0..20"
      data-required="false"
      data-ref={propertyId}
      data-rel="belongs-to"
    >
      {media.map((asset) => (
        <img
          key={asset.id}
          src={`/assets/${asset.id}.jpg`}
          alt="Fotografía de la propiedad"
          data-node-id={asset.id}
          data-node-type="media-asset"
          data-semantic-role="field"
          data-asset-id={asset.id}
          data-asset-purpose={asset.purpose}
          data-asset-required="false"
          data-asset-alt-intent="Muestra el estado real y el ambiente de la propiedad"
          data-asset-fallback="hide-field"
        />
      ))}
    </div>
  );
}

function ComplianceRecordCEE({ energyRating, propertyId }) {
  return (
    <p
      data-node-id={energyRating.id}
      data-node-type="compliance-record"
      data-semantic-role="status"
      data-concept-id="energy-rating"
      data-content-kind="status-label"
      data-content-source="fixture"
      data-required="true"
      data-business-priority="high"
      data-record-status="fixture"
      data-verification-status="unverified"
      data-cee-rating={energyRating.rating}
      data-jurisdiction="ES"
      data-applicability="mandatory"
      data-ref={propertyId}
      data-rel="validates"
    >
      Certificado de Eficiencia Energética: categoría {energyRating.rating}
    </p>
  );
}

function ComplianceRecordRegionalRegistry({ registry, propertyId }) {
  return (
    <div
      data-node-id={registry.id}
      data-node-type="compliance-record"
      data-semantic-role="assertion"
      data-jurisdiction={registry.jurisdiction}
      data-applicability="conditional"
      data-record-status="fixture"
      data-verification-status="unverified"
      data-regional-registry-type={registry.registryType}
      data-ventanilla-digital-sync={registry.syncStatus}
      data-ref={propertyId}
      data-rel="validates"
    >
      <p
        data-node-id={`${registry.id}-label`}
        data-node-type="compliance-record"
        data-semantic-role="field"
        data-concept-id="regional-registry-type"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
      >
        Registro autonómico de vivienda: {registry.registryType} ({registry.jurisdiction})
      </p>
      <p
        data-node-id={`${registry.id}-sync-status`}
        data-node-type="compliance-record"
        data-semantic-role="status"
        data-concept-id="ventanilla-digital-sync-status"
        data-content-kind="status-label"
        data-content-source="computed"
        data-record-status="fixture"
        data-verification-status="unverified"
        {...(registry.syncError ? { 'data-logic-variant': 'error', 'aria-invalid': 'true' } : {})}
      >
        {registry.syncError
          ? 'Error al verificar la sincronización con la Ventanilla Única Digital.'
          : `Sincronización con la Ventanilla Única Digital: ${registry.syncStatus}`}
      </p>
    </div>
  );
}

function ComplianceRecordDIA({ dia, propertyId }) {
  return (
    <div
      data-node-id={dia.id}
      data-node-type="compliance-record"
      data-semantic-role="assertion"
      data-legal-requirement="DIA-Decreto-218"
      data-jurisdiction={dia.jurisdiction}
      data-applicability="conditional"
      data-record-status="fixture"
      data-verification-status="unverified"
      data-ref={propertyId}
      data-rel="documents"
    >
      <p
        data-node-id={`${dia.id}-notice`}
        data-node-type="compliance-record"
        data-semantic-role="assertion"
        data-content-kind="legal-text"
        data-content-source="legal"
        data-jurisdiction={dia.jurisdiction}
        data-applicability="conditional"
        data-record-status="fixture"
        data-verification-status="unverified"
      >
        Documento Informativo Abreviado exigido por el Decreto 218/2005 de la Junta de Andalucía para la
        comercialización de viviendas en esta comunidad autónoma.
      </p>
      <p
        data-node-id={dia.usableArea.id}
        data-node-type="property-metric"
        data-semantic-role="field"
        data-concept-id="superficie-util"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
      >
        Superficie útil: {dia.usableArea.value} {dia.usableArea.unit}
      </p>
      <p
        data-node-id={dia.builtArea.id}
        data-node-type="property-metric"
        data-semantic-role="field"
        data-concept-id="superficie-construida"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
      >
        Superficie construida: {dia.builtArea.value} {dia.builtArea.unit}
      </p>
      <p
        data-node-id={dia.communityExpenses.id}
        data-node-type="financial-summary"
        data-semantic-role="field"
        data-concept-id="gastos-comunidad"
        data-content-kind="price"
        data-content-source="fixture"
        data-required="true"
      >
        Gastos de comunidad: {dia.communityExpenses.amount} {dia.communityExpenses.currency}/mes
      </p>
      <p
        data-node-id={dia.ibi.id}
        data-node-type="financial-summary"
        data-semantic-role="field"
        data-concept-id="ibi"
        data-content-kind="price"
        data-content-source="fixture"
        data-required="true"
      >
        IBI: {dia.ibi.amount} {dia.ibi.currency}/año
      </p>
      <button
        type="button"
        data-node-id={dia.downloadActionId}
        data-node-type="compliance-record"
        data-semantic-role="action"
        data-action-id={dia.downloadActionId}
        data-action-intent="download-document"
        data-content-kind="action-label"
        data-required="true"
        data-ref={dia.id}
        data-rel="documents"
      >
        Descargar Documento Informativo Abreviado (DIA)
      </button>
    </div>
  );
}

function FeeAgencyAssertion({ fee, propertyId }) {
  const text = {
    landlord:
      'Honorarios de agencia a cargo de la persona arrendadora, conforme a la Ley 12/2023, para contratos de vivienda habitual. Excluidos del total a pagar por la persona inquilina.',
    negotiable: 'Honorarios de agencia sujetos a negociación entre las partes para este contrato de temporada.',
    tenant: 'Honorarios de agencia a cargo de la persona inquilina, conforme a las condiciones de este contrato de uso comercial.',
  }[fee.payableBy];

  return (
    <p
      data-node-id={fee.id}
      data-node-type="fee-agency"
      data-semantic-role="assertion"
      data-concept-id="agency-fee-allocation"
      data-content-kind="legal-text"
      data-content-source="legal"
      data-record-status="fixture"
      data-verification-status="unverified"
      data-payable-by={fee.payableBy}
      data-jurisdiction="ES"
      data-applicability="mandatory"
      data-required="true"
      data-ref={propertyId}
      data-rel="prices"
    >
      {text}
    </p>
  );
}

function ContactAgentAction({ actionId, agent }) {
  return (
    <button
      type="button"
      data-node-id={actionId}
      data-node-type="agent"
      data-semantic-role="action"
      data-action-id={actionId}
      data-action-intent="contact-agent"
      data-required-input="contact-phone"
      data-content-kind="action-label"
      data-ref={agent.id}
      data-rel="belongs-to"
      aria-label={`Contactar con ${agent.name} sobre esta propiedad`}
    >
      Contactar con {agent.name}
    </button>
  );
}

function RequestViewingAction({ actionId, propertyId, loading }) {
  return (
    <button
      type="button"
      data-node-id={actionId}
      data-node-type="property"
      data-semantic-role="action"
      data-action-id={actionId}
      data-action-intent="request-viewing"
      data-required-input="preferred-visit-date"
      data-content-kind="action-label"
      data-ref={propertyId}
      data-rel="belongs-to"
      {...(loading ? { 'data-logic-variant': 'loading', 'aria-busy': 'true' } : {})}
    >
      {loading ? 'Comprobando disponibilidad de horarios…' : 'Solicitar Visita'}
    </button>
  );
}

function ExpandDetailAction({ actionId, propertyId }) {
  return (
    <button
      type="button"
      data-node-id={actionId}
      data-node-type="property"
      data-semantic-role="action"
      data-action-id={actionId}
      data-action-intent="expand-detail"
      data-content-kind="action-label"
      data-ref={propertyId}
      data-rel="belongs-to"
    >
      Ver Ficha Completa
    </button>
  );
}

/**
 * PropertyListing — the canonical rental-listing entity. Same
 * data-node-id is reused whenever this same property is rendered on a
 * different page (Home teaser / Search summary / Detail complete): it is
 * the same real-world entity, not a new one per page.
 */
export function PropertyListing({ property, contentDepth }) {
  const agent = findAgent(property.assignedAgentId);
  return (
    <article
      data-node-id={property.id}
      data-node-type="property"
      data-semantic-role="entity"
      data-contract-type={property.contractType}
      data-business-priority={contentDepth === 'teaser' ? 'medium' : 'high'}
      data-ref="agency-001"
      data-rel="belongs-to"
    >
      <h3
        data-node-id={`${property.id}-title`}
        data-node-type="property"
        data-semantic-role="field"
        data-concept-id="listing-title"
        data-content-kind="text"
        data-content-source="cms"
        data-required="true"
        data-max-length="120"
      >
        {property.title}
      </h3>

      {contentDepth !== 'teaser' && (
        <p
          data-node-id={`${property.id}-description`}
          data-node-type="property"
          data-semantic-role="field"
          data-concept-id="listing-description"
          data-content-kind="text"
          data-content-source="cms"
          data-required="false"
          data-max-length="600"
        >
          {property.description}
        </p>
      )}

      <PostalAddressField address={property.address} propertyId={property.id} contentDepth={contentDepth} />
      <FinancialSummary financialSummary={property.financialSummary} propertyId={property.id} contentDepth={contentDepth} />

      {contentDepth !== 'teaser' && <AmenityCollection amenities={property.amenities} propertyId={property.id} />}
      {contentDepth === 'complete' && <MediaAssetList media={property.media} propertyId={property.id} />}

      <ComplianceRecordCEE energyRating={property.compliance.energyRating} propertyId={property.id} />

      {contentDepth !== 'teaser' && (
        <ComplianceRecordRegionalRegistry registry={property.compliance.regionalRegistry} propertyId={property.id} />
      )}

      {contentDepth === 'complete' && property.compliance.dia && (
        <ComplianceRecordDIA dia={property.compliance.dia} propertyId={property.id} />
      )}

      {contentDepth !== 'teaser' && (
        <FeeAgencyAssertion fee={property.compliance.feeAgency} propertyId={property.id} />
      )}

      {contentDepth === 'teaser' && <ExpandDetailAction actionId={property.actions.expandDetailActionId} propertyId={property.id} />}

      {contentDepth !== 'teaser' && agent && (
        <ContactAgentAction actionId={property.actions.contactAgentActionId} agent={agent} />
      )}

      {contentDepth !== 'teaser' && (
        <RequestViewingAction
          actionId={property.actions.requestViewingActionId}
          propertyId={property.id}
          loading={Boolean(property.actions.requestViewingLoading)}
        />
      )}
    </article>
  );
}