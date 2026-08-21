/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * PropertyListing and its true ownership tree: PostalAddress,
 * FinancialSummary, AmenityCollection, media, Spain proptech compliance
 * records (regional registry / CEE / DIA / agency-fee), and the actions a
 * listing exposes.
 *
 * `contentDepth` ('teaser' | 'summary' | 'complete') is a content-scope
 * decision. PropertyDetailView composes the same semantic nodes into the
 * Penpot detail-page layout (media + main + sidebar).
 */
import { findAgentById } from '../propertyCatalog.js';

const PERIOD_LABEL = { month: '/mes', year: '/año', 'one-time': '' };

const SYNC_STATUS_LABEL = {
  pending: 'pendiente',
  unverified: 'no verificado',
};

function syncStatusLabel(status) {
  return SYNC_STATUS_LABEL[status] ?? status;
}

function PostalAddressField({ address, propertyId, contentDepth, variant = 'default' }) {
  if (variant === 'detail-line') {
    const street = address.streetAddress || 'Dirección exacta no publicada';
    return (
      <address
        data-node-id={address.id}
        data-node-type="address"
        data-semantic-role="entity"
        data-locale="es-ES"
        data-ref={propertyId}
        data-rel="locates"
        className="detail-address"
      >
        <span
          data-node-id={`${address.id}-street`}
          data-node-type="address"
          data-semantic-role="field"
          data-concept-id="street-address"
          data-content-kind="address"
          data-content-source="fixture"
          data-required="false"
          {...(!address.streetAddress ? { 'data-empty-state': 'hide-field' } : {})}
        >
          {street}
        </span>
        <span className="detail-address-sep" aria-hidden="true">
          {' '}
          ·{' '}
        </span>
        <span
          data-node-id={`${address.id}-municipality`}
          data-node-type="address"
          data-semantic-role="field"
          data-concept-id="municipality"
          data-content-kind="address"
          data-content-source="fixture"
          data-required="true"
        >
          {address.municipality}
        </span>
        <span>, </span>
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
        <span className="detail-address-sep" aria-hidden="true">
          {' '}
          ·{' '}
        </span>
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
      </address>
    );
  }

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

function AmenityCollection({ amenities, propertyId, variant = 'default' }) {
  const hasItems = amenities.items.length > 0;
  const listClass = variant === 'chips' ? 'detail-amenity-tags' : undefined;

  return (
    <ul
      data-node-id={amenities.id}
      data-node-type="amenity"
      data-semantic-role="collection"
      data-cardinality="0..40"
      data-required="false"
      data-ref={propertyId}
      data-rel="belongs-to"
      className={listClass}
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
            className={variant === 'chips' ? 'detail-chip detail-chip--amenity' : undefined}
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

function resolveMediaSrc(asset) {
  if (asset.url) return asset.url;
  return `/assets/${asset.id}.jpg`;
}

function MediaAssetList({ media, propertyId, variant = 'default' }) {
  if (variant === 'hero') {
    const photo = media.find((asset) => Boolean(asset.url));
    const semanticAsset = photo ?? media[0];
    return (
      <section
        data-node-id={`property-media-${propertyId}`}
        data-node-type="media-asset"
        data-semantic-role="collection"
        data-cardinality="0..20"
        data-required="false"
        data-ref={propertyId}
        data-rel="belongs-to"
        className="property-media"
        {...(!photo ? { 'data-empty-state': 'show-placeholder' } : {})}
      >
        <div className={`media-tile${photo ? '' : ' media-tile--placeholder'}`}>
          {photo ? (
            <img
              src={resolveMediaSrc(photo)}
              alt="Fotografía de la propiedad"
              data-node-id={photo.id}
              data-node-type="media-asset"
              data-semantic-role="field"
              data-asset-id={photo.id}
              data-asset-purpose={photo.purpose}
              data-asset-required="false"
              data-asset-alt-intent="Muestra el estado real y el ambiente de la propiedad"
              data-asset-fallback="hide-field"
              className="media-tile-image"
            />
          ) : (
            <>
              {semanticAsset && (
                <span
                  hidden
                  data-node-id={semanticAsset.id}
                  data-node-type="media-asset"
                  data-semantic-role="field"
                  data-asset-id={semanticAsset.id}
                  data-asset-purpose={semanticAsset.purpose}
                />
              )}
              <svg className="media-tile-glyph" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.25">
                <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
              </svg>
              <span className="media-tile-tag">HABITAFACTORIA</span>
            </>
          )}
        </div>
      </section>
    );
  }

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
          src={resolveMediaSrc(asset)}
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

function ComplianceRecordCEE({ energyRating, propertyId, variant = 'default' }) {
  if (variant === 'chip') {
    return (
      <span
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
        className="detail-chip detail-chip--status"
      >
        CEE: {energyRating.rating}
      </span>
    );
  }

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

function ComplianceRecordRegionalRegistry({ registry, propertyId, variant = 'default' }) {
  if (variant === 'chip') {
    return (
      <span
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
        className="detail-chip detail-chip--status"
        {...(registry.syncError ? { 'data-logic-variant': 'error', 'aria-invalid': 'true' } : {})}
      >
        <span data-node-id={`${registry.id}-label`} data-node-type="compliance-record" data-semantic-role="field" data-concept-id="regional-registry-type">
          {registry.registryType}: {syncStatusLabel(registry.syncStatus)}
        </span>
        <span hidden data-node-id={`${registry.id}-sync-status`} data-node-type="compliance-record" data-semantic-role="status">
          {syncStatusLabel(registry.syncStatus)}
        </span>
      </span>
    );
  }

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
          : `Sincronización con la Ventanilla Única Digital: ${syncStatusLabel(registry.syncStatus)}`}
      </p>
    </div>
  );
}

function ComplianceRecordDIA({ dia, propertyId, variant = 'default' }) {
  if (variant === 'panel') {
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
        className="detail-dia-block"
      >
        <span className="detail-dia-badge">DOCUMENTO LEGAL</span>
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
          className="detail-dia-notice"
        >
          Documento Informativo Abreviado exigido por el Decreto 218/2005 de la Junta de Andalucía para la
          comercialización de viviendas en esta comunidad autónoma.
        </p>
        <div className="detail-dia-metrics">
          <div className="detail-dia-metric">
            <span className="detail-dia-metric-label">Superficie útil</span>
            <p
              data-node-id={dia.usableArea.id}
              data-node-type="property-metric"
              data-semantic-role="field"
              data-concept-id="superficie-util"
              data-content-kind="text"
              data-content-source="fixture"
              data-required="true"
            >
              {dia.usableArea.value} {dia.usableArea.unit}
            </p>
          </div>
          <div className="detail-dia-metric">
            <span className="detail-dia-metric-label">Superficie construida</span>
            <p
              data-node-id={dia.builtArea.id}
              data-node-type="property-metric"
              data-semantic-role="field"
              data-concept-id="superficie-construida"
              data-content-kind="text"
              data-content-source="fixture"
              data-required="true"
            >
              {dia.builtArea.value} {dia.builtArea.unit}
            </p>
          </div>
          <div className="detail-dia-metric">
            <span className="detail-dia-metric-label">Gastos de comunidad</span>
            <p
              data-node-id={dia.communityExpenses.id}
              data-node-type="financial-summary"
              data-semantic-role="field"
              data-concept-id="gastos-comunidad"
              data-content-kind="price"
              data-content-source="fixture"
              data-required="true"
            >
              {dia.communityExpenses.amount} {dia.communityExpenses.currency}/mes
            </p>
          </div>
          <div className="detail-dia-metric">
            <span className="detail-dia-metric-label">IBI</span>
            <p
              data-node-id={dia.ibi.id}
              data-node-type="financial-summary"
              data-semantic-role="field"
              data-concept-id="ibi"
              data-content-kind="price"
              data-content-source="fixture"
              data-required="true"
            >
              {dia.ibi.amount} {dia.ibi.currency}/año
            </p>
          </div>
        </div>
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
          className="detail-btn detail-btn--outline"
        >
          Descargar Documento Informativo Abreviado (DIA)
        </button>
      </div>
    );
  }

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
      className="detail-fee-note"
    >
      {text}
    </p>
  );
}

function ContactAgentAction({ actionId, agent, className }) {
  const firstName = agent.name.split(' ')[0];
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
      className={className}
    >
      Contactar con {firstName}
    </button>
  );
}

function RequestViewingAction({ actionId, propertyId, loading, className }) {
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
      className={className}
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

function DetailSidebar({ property, agent }) {
  const fs = property.financialSummary;
  const period = PERIOD_LABEL[fs.basePrice.period];
  const feeParts = [];
  if (fs.communityFees) {
    feeParts.push(`Comunidad: ${fs.communityFees.amount} ${fs.communityFees.currency}/mes`);
  }
  if (fs.taxObligation) {
    feeParts.push(`IBI: ${fs.taxObligation.amount} ${fs.taxObligation.currency}/año`);
  }

  return (
    <aside className="detail-sidebar">
      <div
        data-node-id={fs.id}
        data-node-type="financial-summary"
        data-semantic-role="entity"
        data-ref={property.id}
        data-rel="prices"
        className="detail-sidebar-price-block"
      >
        <p
          data-node-id={fs.basePrice.id}
          data-node-type="financial-summary"
          data-semantic-role="field"
          data-concept-id="monthly-rent"
          data-content-kind="price"
          data-content-source="fixture"
          data-required="true"
          data-business-priority="critical"
          className="detail-sidebar-price"
          {...(fs.expensesIncluded ? { 'data-inseparable-fact': 'true' } : {})}
        >
          {fs.basePrice.amount} {fs.basePrice.currency} {period}
        </p>
        {fs.expensesIncluded && (
          <span
            data-node-id={`${fs.basePrice.id}-expenses-included`}
            data-node-type="financial-summary"
            data-semantic-role="status"
            data-concept-id="expenses-included-qualifier"
            data-content-kind="status-label"
            data-inseparable-fact="true"
            className="detail-pill"
          >
            Gastos Incluidos
          </span>
        )}
        {feeParts.length > 0 && (
          <p className="detail-sidebar-fees">
            {fs.communityFees && (
              <span data-node-id={fs.communityFees.id} data-node-type="financial-summary" data-semantic-role="field" data-concept-id="community-fees">
                Comunidad: {fs.communityFees.amount} {fs.communityFees.currency}/mes
              </span>
            )}
            {fs.communityFees && fs.taxObligation && <span aria-hidden="true"> · </span>}
            {fs.taxObligation && (
              <span data-node-id={fs.taxObligation.id} data-node-type="financial-summary" data-semantic-role="field" data-concept-id="ibi">
                IBI: {fs.taxObligation.amount} {fs.taxObligation.currency}/año
              </span>
            )}
          </p>
        )}
      </div>

      <hr className="detail-divider" />

      {agent && (
        <div className="detail-agent" data-ref={agent.id}>
          <img
            src={`/assets/${agent.portraitAssetId}`}
            alt={agent.name}
            data-node-id={agent.portraitAssetId}
            data-node-type="media-asset"
            data-semantic-role="field"
            className="detail-agent-avatar"
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden';
            }}
          />
          <div>
            <p data-node-id={`${agent.id}-name`} data-node-type="agent" data-semantic-role="field" className="detail-agent-name">
              {agent.name}
            </p>
            <p data-node-id={`${agent.id}-role`} data-node-type="agent" data-semantic-role="field" className="detail-agent-role">
              {agent.role}
            </p>
          </div>
        </div>
      )}

      {agent && (
        <ContactAgentAction
          actionId={property.actions.contactAgentActionId}
          agent={agent}
          className="detail-btn detail-btn--primary"
        />
      )}
      <RequestViewingAction
        actionId={property.actions.requestViewingActionId}
        propertyId={property.id}
        loading={Boolean(property.actions.requestViewingLoading)}
        className="detail-btn detail-btn--outline"
      />
    </aside>
  );
}

/**
 * Penpot detail-page layout: hero media + main column + sticky sidebar.
 * Reuses the same data-node-id contract as PropertyListing (complete depth).
 */
export function PropertyDetailView({ property }) {
  const agent = findAgentById(property.assignedAgentId);

  return (
    <article
      data-node-id={property.id}
      data-node-type="property"
      data-semantic-role="entity"
      data-contract-type={property.contractType}
      data-business-priority="high"
      data-ref="agency-001"
      data-rel="belongs-to"
      className="detail-page"
    >
      <MediaAssetList media={property.media} propertyId={property.id} variant="hero" />

      <div className="detail-body">
        <div className="detail-main">
          <h1
            data-node-id={`${property.id}-title`}
            data-node-type="property"
            data-semantic-role="field"
            data-concept-id="listing-title"
            data-content-kind="text"
            data-content-source="cms"
            data-required="true"
            data-max-length="120"
            className="detail-title"
          >
            {property.title}
          </h1>

          <PostalAddressField address={property.address} propertyId={property.id} contentDepth="complete" variant="detail-line" />

          <div className="detail-status-chips">
            <ComplianceRecordCEE energyRating={property.compliance.energyRating} propertyId={property.id} variant="chip" />
            <ComplianceRecordRegionalRegistry
              registry={property.compliance.regionalRegistry}
              propertyId={property.id}
              variant="chip"
            />
          </div>

          <hr className="detail-divider" />

          <h2 className="detail-section-heading">Descripción</h2>
          <p
            data-node-id={`${property.id}-description`}
            data-node-type="property"
            data-semantic-role="field"
            data-concept-id="listing-description"
            data-content-kind="text"
            data-content-source="cms"
            data-required="false"
            data-max-length="600"
            className="detail-description"
          >
            {property.description}
          </p>

          <hr className="detail-divider" />

          <h2 className="detail-section-heading">Comodidades</h2>
          <AmenityCollection amenities={property.amenities} propertyId={property.id} variant="chips" />

          {property.compliance.dia && (
            <>
              <hr className="detail-divider" />
              <h2 className="detail-section-heading">Información Legal de la Vivienda</h2>
              <ComplianceRecordDIA dia={property.compliance.dia} propertyId={property.id} variant="panel" />
            </>
          )}

          <hr className="detail-divider" />
          <FeeAgencyAssertion fee={property.compliance.feeAgency} propertyId={property.id} />
        </div>

        <DetailSidebar property={property} agent={agent} />
      </div>
    </article>
  );
}

/**
 * PropertyListing — the canonical rental-listing entity. Same
 * data-node-id is reused whenever this same property is rendered on a
 * different page (Home teaser / Search summary / Detail complete): it is
 * the same real-world entity, not a new one per page.
 */
export function PropertyListing({ property, contentDepth }) {
  const agent = findAgentById(property.assignedAgentId);
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
