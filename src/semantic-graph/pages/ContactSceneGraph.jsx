import { SiteHeader, SiteFooter } from '../nodes/SiteChrome.jsx';
import { ContactForm } from '../nodes/ContactNodes.jsx';

export default function ContactSceneGraph() {
  return (
    <div
      data-scene-schema="proptech-semantic-graph"
      data-scene-version="1.0.0"
      data-locale="es-ES"
      data-node-id="contact-page-001"
      data-node-type="page"
      data-semantic-role="entity"
    >
      <SiteHeader />
      <main className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Contacto</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hablemos de tu nuevo hogar</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">Cuéntanos qué estás buscando y nuestro equipo te responderá con opciones pensadas para ti.</p>
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}