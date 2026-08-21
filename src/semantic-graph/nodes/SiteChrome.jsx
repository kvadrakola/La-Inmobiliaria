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
      className="mt-3"
    >
      <p
        data-node-id="agency-contact-point-001-trade-name"
        data-node-type="contact-point"
        data-semantic-role="field"
        data-concept-id="agency-trade-name"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
        className="font-semibold text-white"
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
        className="mt-1 text-sm"
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
        className="text-sm text-blue-300"
      >
        <a href={`mailto:${agency.contactEmail}`} className="hover:text-white">
          {agency.contactEmail}
        </a>
      </p>
      <p
        data-node-id="agency-contact-point-001-address"
        data-node-type="contact-point"
        data-semantic-role="field"
        data-concept-id="agency-office-address"
        data-content-kind="address"
        data-content-source="fixture"
        data-required="false"
        className="text-sm"
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
      className="mt-3 space-y-2"
    >
      <button
        type="button"
        data-node-id={`${payment.id}-label`}
        data-node-type="payment-method"
        data-semantic-role="field"
        data-concept-id="payment-method-name"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
        className="rounded bg-blue-500 px-2 py-[0.5px] font-bold text-white hover:bg-blue-600"
      >
        Bizum
      </button>
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
      className="text-xs text-gray-500"
    >
      Registro de intermediación inmobiliaria (Ventanilla Única Digital): {credential.registrationNumber}
    </div>
  );
}

const LEGAL_DOCUMENT_ROUTES = {
  'action-view-privacy-001': '/privacidad',
  'action-view-terms-001': '/terminos',
};

function LegalDocumentCollection({ collection }) {
  return (
    <ul
      data-node-id={collection.id}
      data-node-type="compliance-record"
      data-semantic-role="collection"
      data-cardinality="1..6"
      data-required="true"
      className="mt-3 space-y-1 text-sm"
    >
      {collection.items.map((item) => (
        <li key={item.id}>
          <a
            href={LEGAL_DOCUMENT_ROUTES[item.id] ?? '#'}
            data-node-id={item.id}
            data-node-type="compliance-record"
            data-semantic-role="action"
            data-action-id={item.id}
            data-action-intent="view-legal-document"
            data-content-kind="action-label"
            className="hover:text-white"
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
    <footer className="w-full bg-[#1f2937] text-gray-300">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold text-white">Contacto</h3>
            <AgencyContactPoint agency={agencyFixture} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Métodos de Pago</h3>
            <PaymentMethodAssertion payment={paymentMethodFixture} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Legal</h3>
            <LegalDocumentCollection collection={legalDocumentCollectionFixture} />
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <AgencyProfessionalCredential credential={agencyFixture.professionalCredential} />
      </div>
    </footer>
  );
}