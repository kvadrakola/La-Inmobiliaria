import React from 'react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import ContactForm from '../components/contact/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.18em]"
              style={{ color: 'var(--color-primary)' }}
            >
              Contacto
            </p>
            <h1
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--color-text-body)' }}
            >
              Contacta con nosotros
            </h1>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Estamos aquí para ayudarte en tu próxima inversión inmobiliaria con un servicio más cercano,
              transparente y personalizado.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <aside
              className="rounded-2xl border p-6 shadow-sm sm:p-8"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-soft-sm)',
              }}
            >
              <h2 className="mb-6 text-2xl font-bold" style={{ color: 'var(--color-text-body)' }}>
                Información de contacto
              </h2>

              <div className="space-y-5">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-1 text-base font-semibold" style={{ color: 'var(--color-primary)' }}>
                    📍 Dirección
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
                    Calle Ejemplo, 12, Madrid
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-1 text-base font-semibold" style={{ color: 'var(--color-primary)' }}>
                    📞 Teléfono
                  </h3>
                  <p className="text-sm leading-relaxed">
                    <a href="tel:+34600123456" style={{ color: 'var(--color-text-body)' }}>
                      +34 600 123 456
                    </a>
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-1 text-base font-semibold" style={{ color: 'var(--color-primary)' }}>
                    ✉️ Email
                  </h3>
                  <p className="text-sm leading-relaxed">
                    <a href="mailto:info@habitafactoria.es" style={{ color: 'var(--color-text-body)' }}>
                      info@habitafactoria.es
                    </a>
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-1 text-base font-semibold" style={{ color: 'var(--color-primary)' }}>
                    🕐 Horario
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
                    Lunes a Viernes: 9:00 - 19:00
                    <br />
                    Sábados: 10:00 - 14:00
                  </p>
                </div>
              </div>
            </aside>

            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}