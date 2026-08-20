/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Barrel export for the Core Funnel scene graph (Home, Search/"Vitrina",
 * Detail stub) and its manifest, for downstream (Penpot MCP) consumption.
 */
export { default as HomeSceneGraph } from './pages/HomeSceneGraph.jsx';
export { default as SearchSceneGraph } from './pages/SearchSceneGraph.jsx';
export { default as DetailSceneGraph } from './pages/DetailSceneGraph.jsx';
export { default as ContactSceneGraph } from './pages/ContactSceneGraph.jsx';
export { default as AboutSceneGraph } from './pages/AboutSceneGraph.jsx';
export { SCENE_GRAPH_MANIFEST } from './manifest.js';
export * from './fixtures.js';
export * from './domainTypes.js';
