/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Site-wide chrome: brand identity, navigation, and footer disclosures.
 * Rendered identically (same data-node-id values) on every page — it is
 * the same navigation/footer entity repeated per page occurrence, not a
 * new entity each time. See root-level DOM-order contract comment in
 * ../pages/*.jsx for how source order should be interpreted downstream.
 */
import { agencyFixture, legalDocumentCollectionFixture, paymentMethodFixture } from '../fixtures.js';

import Header from '../../components/layout/Header.jsx';

export function SiteHeader() {
  return <Header />;
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
        data-node-id="agency-contact-point-001-trade-name"
        data-node-type="contact-point"
        data-semantic-role="field"
        data-concept-id="agency-trade-name"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
      >
        {agency.tradeName}
      </p>
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
      className="mt-3 flex flex-col gap-2"
    >
      <span
        data-node-id={`${payment.id}-label`}
        data-node-type="payment-method"
        data-semantic-role="field"
        data-concept-id="payment-method-name"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
        className="inline-block rounded border border-gray-600 bg-[#eff6ff] px-2 py-0.5 text-xs font-semibold text-[#0047AB]"
      >
        Bizum
      </span>
      <span
        data-node-id={`${payment.id}-policy-statement`}
        data-node-type="payment-method"
        data-semantic-role="status"
        data-concept-id="fee-transparency-policy"
        data-content-kind="status-label"
        className="block text-sm"
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
      <div className="site-footer-grid">
        <div className="site-footer-column">
          <h3 className="site-footer-title">Contacto</h3>
          <AgencyContactPoint agency={agencyFixture} />
        </div>
        <div className="site-footer-column">
          <h3 className="site-footer-title">Métodos de Pago</h3>
          <PaymentMethodAssertion payment={paymentMethodFixture} />
        </div>
        <div className="site-footer-column">
          <h3 className="site-footer-title">Legal</h3>
          <LegalDocumentCollection collection={legalDocumentCollectionFixture} />
        </div>
      </div>
      <hr className="site-footer-divider" />
      <AgencyProfessionalCredential credential={agencyFixture.professionalCredential} />
    </footer>
  );
}