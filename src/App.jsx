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
  AboutSceneGraph,
} from './semantic-graph';
import { SemanticActionRouter } from './semantic-graph/SemanticActionRouter.jsx';
import RestaurantePage from './pages/RestaurantePage.jsx';
import { ROUTES } from './navigation/routes.js';

export default function App() {
  return (
    <BrowserRouter>
      <SemanticActionRouter>
        <Routes>
          <Route path={ROUTES.home} element={<HomeSceneGraph />} />
          <Route path={ROUTES.search} element={<SearchSceneGraph />} />
          <Route path={ROUTES.searchAlias} element={<SearchSceneGraph />} />
          <Route path="/propiedad/:propertyId" element={<DetailSceneGraph />} />
          <Route path={ROUTES.contact} element={<ContactSceneGraph />} />
          <Route path={ROUTES.about} element={<AboutSceneGraph />} />
          <Route path={ROUTES.restaurant} element={<RestaurantePage />} />
        </Routes>
      </SemanticActionRouter>
    </BrowserRouter>
  );
}
