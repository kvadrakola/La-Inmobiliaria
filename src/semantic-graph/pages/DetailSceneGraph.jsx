/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Detail page — Penpot `detail-page-001` layout for a single PropertyListing
 * at complete content depth: media hero, main column, and action sidebar.
 */
import { Link, useParams } from 'react-router-dom';
import { SiteHeader, SiteFooter } from '../nodes/SiteChrome.jsx';
import { PropertyDetailView } from '../nodes/PropertyNodes.jsx';
import { getPropertyById } from '../propertyCatalog.js';
import '../../styles/detail.css';

export default function DetailSceneGraph() {
  const { propertyId } = useParams();
  const property = getPropertyById(propertyId);

  return (
    <div
      data-scene-schema="proptech-semantic-graph"
      data-scene-version="1.0.0"
      data-locale="es-ES"
      data-node-id="detail-page-001"
      data-node-type="page"
      data-semantic-role="entity"
      className="detail-scene"
    >
      <SiteHeader />
      <main>
        {property ? (
          <PropertyDetailView property={property} />
        ) : (
          <section className="detail-not-found">
            <h1>Propiedad no encontrada</h1>
            <p>No existe una ficha para el identificador solicitado.</p>
            <Link to="/buscar" className="detail-btn detail-btn--primary">
              Volver a propiedades
            </Link>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
