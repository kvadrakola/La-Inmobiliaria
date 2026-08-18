/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Site-wide chrome: brand identity, navigation, and footer disclosures.
 * Rendered identically (same data-node-id values) on every page — it is
 * the same navigation/footer entity repeated per page occurrence, not a
 * new entity each time. See root-level DOM-order contract comment in
 * ../pages/*.jsx for how source order should be interpreted downstream.
 */
import { agencyFixture, siteNavigationFixture, legalDocumentCollectionFixture, paymentMethodFixture } from '../fixtures.js';

function BrandIdentityMark({ agency }) {
  return (
    <a
      href="/"
      className="brand-mark"
      data-node-id={`${agency.id}-brand-mark`}
      data-node-type="agency"
      data-semantic-role="field"
      data-concept-id="agency-trade-name"
      data-content-kind="text"
      data-content-source="fixture"
      data-required="true"
      data-ref={agency.id}
      data-rel="belongs-to"
    >
      {agency.tradeName}
    </a>
  );
}

function NavigationAction({ item }) {
  return (
    <a
      href="#"
      className="nav-item"
      data-node-id={item.id}
      data-node-type="agency"
      data-semantic-role="action"
      data-action-id={item.id}
      data-action-intent={item.intent}
      data-content-kind="action-label"
    >
      {item.label}
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="brand-logo">
        <BrandIdentityMark agency={agencyFixture} />
      </div>

      <nav
      className="site-nav"
      aria-label="Navegación principal"
      >
        <ul
          className="flex items-center gap-6"
          data-node-id={siteNavigationFixture.id}
          data-node-type="agency"
          data-semantic-role="collection"
          data-cardinality="4..4"
          data-required="true"
        >
          {siteNavigationFixture.items.map((item) => (
            <li key={item.id}>
              <NavigationAction item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function AgencyContactPoint({ agency }) {
  return (
    <address
      data-node-id="agency-contact-point-001"
      data-node-type="contact-point"
      data-semantic-role="entity"
      data-ref={agency.id}
      data-rel="belongs-to"
    >
      <p
        data-node-id="agency-contact-point-001-phone"
        data-node-type="contact-point"
        data-semantic-role="field"
        data-concept-id="agency-contact-phone"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
      >
        {agency.contactPhone}
      </p>
      <p
        data-node-id="agency-contact-point-001-email"
        data-node-type="contact-point"
        data-semantic-role="field"
        data-concept-id="agency-contact-email"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
      >
        {agency.contactEmail}
      </p>
      <p
        data-node-id="agency-contact-point-001-address"
        data-node-type="contact-point"
        data-semantic-role="field"
        data-concept-id="agency-office-address"
        data-content-kind="address"
        data-content-source="fixture"
        data-required="false"
      >
        {agency.address.streetAddress}, {agency.address.municipality}
      </p>
    </address>
  );
}

function PaymentMethodAssertion({ payment }) {
  return (
    <div
      data-node-id={payment.id}
      data-node-type="payment-method"
      data-semantic-role="assertion"
      data-content-kind="text"
      data-content-source="fixture"
      data-required="true"
    >
      <img
        src={`/assets/${payment.bizumAssetId}.svg`}
        alt="Método de pago Bizum aceptado"
        data-node-id={payment.bizumAssetId}
        data-node-type="media-asset"
        data-semantic-role="field"
        data-asset-id={payment.bizumAssetId}
        data-asset-purpose="payment-method:bizum"
        data-asset-required="true"
        data-asset-alt-intent="Comunica que Bizum es un método de pago aceptado"
        data-asset-fallback="show-text-label"
      />
      <span
        data-node-id={`${payment.id}-policy-statement`}
        data-node-type="payment-method"
        data-semantic-role="status"
        data-concept-id="fee-transparency-policy"
        data-content-kind="status-label"
      >
        {payment.policyStatement}
      </span>
    </div>
  );
}

function AgencyProfessionalCredential({ credential }) {
  return (
    <div
      data-node-id={credential.id}
      data-node-type="compliance-record"
      data-semantic-role="assertion"
      data-jurisdiction={credential.jurisdiction}
      data-applicability="mandatory"
      data-record-status="fixture"
      data-verification-status="unverified"
      data-concept-id="professional-registration-number"
      data-content-kind="text"
      data-content-source="fixture"
      data-required="true"
    >
      Registro de intermediación inmobiliaria (Ventanilla Única Digital): {credential.registrationNumber}
    </div>
  );
}

function LegalDocumentCollection({ collection }) {
  return (
    <ul
      data-node-id={collection.id}
      data-node-type="compliance-record"
      data-semantic-role="collection"
      data-cardinality="1..6"
      data-required="true"
    >
      {collection.items.map((item) => (
        <li key={item.id}>
          <a
            href="#"
            data-node-id={item.id}
            data-node-type="compliance-record"
            data-semantic-role="action"
            data-action-id={item.id}
            data-action-intent="view-legal-document"
            data-content-kind="action-label"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <AgencyContactPoint agency={agencyFixture} />
      <PaymentMethodAssertion payment={paymentMethodFixture} />
      <AgencyProfessionalCredential credential={agencyFixture.professionalCredential} />
      <LegalDocumentCollection collection={legalDocumentCollectionFixture} />
    </footer>
  );
}
