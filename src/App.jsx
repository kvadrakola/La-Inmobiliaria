/**
 * App — Root application wrapper
 *
 * Pure routing/page composition layer.
 * Pages are rendered by this wrapper.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  DetailSceneGraph,
  ContactSceneGraph,
  AboutSceneGraph,
} from './semantic-graph';
import { SemanticActionRouter } from './semantic-graph/SemanticActionRouter.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import RestaurantePage from './pages/RestaurantePage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <SemanticActionRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<Properties />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/propiedad/:propertyId" element={<DetailSceneGraph />} />
          <Route path="/contacto" element={<ContactSceneGraph />} />
          <Route path="/about" element={<AboutSceneGraph />} />
          <Route path="/restaurante" element={<RestaurantePage />} />
        </Routes>
      </SemanticActionRouter>
    </BrowserRouter>
  );
}
