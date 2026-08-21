import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import { fetchProperties } from '../data/mockData.js';
import { toPropertyRouteId } from '../semantic-graph/propertyCatalog.js';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties()
      .then((data) => {
        setProperties(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedProperty) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedProperty(null);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedProperty]);

  return (
    <>
      <Header />
      <main className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-primary)' }}>
                Alquileres disponibles
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--color-text-body)' }}>
                Encuentra tu próximo hogar
              </h1>
              <p className="mt-2 max-w-2xl text-base" style={{ color: 'var(--color-text-muted)' }}>
                Habitaciones y pisos seleccionados para vivir en Madrid con gastos incluidos.
              </p>
            </div>
            <Link to="/" className="text-sm font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
              Volver a Inicio
            </Link>
          </div>

          {isLoading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => <div key={item} className="h-80 animate-pulse rounded-xl bg-gray-200" />)}
            </div>
          )}
          {error && <p className="py-12 text-center text-red-600">Error al cargar las propiedades: {error}</p>}
          {!isLoading && !error && (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <Card
                    key={property.id}
                    {...property}
                    compact
                    onDetails={() => setSelectedProperty(property)}
                    isSelected={selectedProperty?.id === property.id}
                  />
                ))}
              </div>

              {selectedProperty && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="property-detail-title"
                  onClick={() => setSelectedProperty(null)}
                >
                  <div
                    className="relative max-h-[calc(100vh-1.5rem)] w-full max-w-5xl overflow-y-auto rounded-xl bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProperty(null)}
                      className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-2xl leading-none text-gray-500 shadow hover:text-gray-900"
                      aria-label="Cerrar detalles"
                    >
                      &times;
                    </button>

                    <img src={selectedProperty.imageUrl} alt={selectedProperty.title} className="h-56 w-full object-cover sm:h-72 lg:h-80" />

                    <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
                      <div className="p-5 sm:p-8">
                        <div className="mb-4 flex flex-wrap gap-2">
                          {selectedProperty.badge && <span className="rounded bg-green-600 px-3 py-1 text-xs font-bold text-white">{selectedProperty.badge}</span>}
                          {selectedProperty.smokingRestriction && <span className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white">{selectedProperty.smokingRestriction}</span>}
                          {selectedProperty.petRestriction && <span className="rounded bg-orange-600 px-3 py-1 text-xs font-bold text-white">{selectedProperty.petRestriction}</span>}
                        </div>
                        <h2 id="property-detail-title" className="mb-2 text-2xl font-bold sm:text-3xl" style={{ color: 'var(--color-text-body)' }}>
                          {selectedProperty.title}
                        </h2>
                        <p className="mb-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                          Madrid · Alquiler mensual · Gastos incluidos
                        </p>
                        <p className="mb-7 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{selectedProperty.description}</p>

                        <h3 className="mb-3 font-semibold" style={{ color: 'var(--color-text-body)' }}>Comodidades</h3>
                        <ul className="mb-7 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2" style={{ color: 'var(--color-text-muted)' }}>
                          {selectedProperty.amenities.map((amenity) => <li key={amenity} className="border-b border-gray-100 py-2">✓ {amenity}</li>)}
                        </ul>

                        <div className="rounded-lg border border-orange-300 bg-orange-50 p-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                          <p className="mb-1 font-bold text-orange-800">Información legal de la vivienda</p>
                          <p>Contrato conforme a la normativa vigente. Documentación disponible antes de formalizar el alquiler.</p>
                        </div>
                      </div>

                      <aside className="border-t bg-gray-50 p-5 sm:p-8 lg:border-l lg:border-t-0">
                        <p className="mb-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>Precio mensual</p>
                        <p className="mb-5 text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{selectedProperty.price} €/mes</p>
                        <p className="mb-5 text-xs" style={{ color: 'var(--color-text-muted)' }}>Gestionado por HabitaFactoría</p>
                        <Button className="w-full">Solicitar visita</Button>
                        <Link
                          to={`/propiedad/${toPropertyRouteId(selectedProperty.id)}`}
                          className="mt-3 flex w-full items-center justify-center rounded-md bg-[#0047ab] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95"
                        >
                          Ver ficha completa
                        </Link>
                        <button type="button" onClick={() => setSelectedProperty(null)} className="mt-3 w-full rounded-md border-2 border-blue-600 bg-white px-5 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50">
                          Volver a propiedades
                        </button>
                      </aside>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
