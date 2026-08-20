/**
 * App — Root application wrapper
 *
 * Pure routing/page composition layer.
 * Pages are rendered by this wrapper.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HomeSceneGraph,
  SearchSceneGraph,
  DetailSceneGraph,
  ContactSceneGraph,
} from './semantic-graph';
import { SemanticActionRouter } from './semantic-graph/SemanticActionRouter.jsx';
import RestaurantePage from './pages/RestaurantePage';

export default function App() {
  return (
    <BrowserRouter>
      <SemanticActionRouter>
        <Routes>
          <Route path="/" element={<HomeSceneGraph />} />
          <Route path="/buscar" element={<SearchSceneGraph />} />
          <Route path="/propiedad/:propertyId" element={<DetailSceneGraph />} />
          <Route path="/contacto" element={<ContactSceneGraph />} />
          <Route path="/restaurante" element={<RestaurantePage />} />
        </Routes>
      </SemanticActionRouter>
    </BrowserRouter>
  );
}
