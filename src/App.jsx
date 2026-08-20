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
} from './semantic-graph';
import { SemanticActionRouter } from './semantic-graph/SemanticActionRouter.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';

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
          <Route path="/contact" element={<ContactSceneGraph />} />
          <Route path="/about" element={<Home />} />
        </Routes>
      </SemanticActionRouter>
    </BrowserRouter>
  );
}
