/**
 * mockData — Mock data that simulates API responses
 *
 * Replace this file with real API calls (fetch/axios) when the backend is ready.
 * Each exported function mimics an async API endpoint returning a Promise.
 */

/**
 * @returns {Promise<Array>} List of agents
 */
export const fetchAgents = () => Promise.resolve([
  { id: 1, name: 'María García', role: 'Agente Senior', photo: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Carlos López', role: 'Agente de Alquileres', photo: 'https://i.pravatar.cc/150?img=3' },
  { id: 3, name: 'Ana Martínez', role: 'Asesora Estudiantil', photo: 'https://i.pravatar.cc/150?img=5' },
]);

/**
 * @returns {Promise<Array>} List of properties
 */
export const fetchProperties = () => Promise.resolve([
  {
    id: 1,
    title: 'Habitación en el Centro',
    description: 'Habitación amueblada con vistas a la plaza mayor. Wifi, calefacción y limpieza incluidos.',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    badge: 'Gastos Incluidos',
  },
  {
    id: 2,
    title: 'Estudio en Moncloa',
    description: 'Estudio completo cerca de la universidad. Ideal para estudiantes de intercambio.',
    price: 550,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    badge: 'Gastos Incluidos',
  },
  {
    id: 3,
    title: 'Piso Compartido Chamberí',
    description: 'Habitación en piso compartido con 3 estudiantes. Ambiente internacional y acogedor.',
    price: 380,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    badge: 'Gastos Incluidos',
  },
  {
    id: 4,
    title: 'Piso Compartido en Sevilla',
    description: 'Habitación en un piso compartido con 5 estudiantes. Cerca del Ayuntamiento.',
    price: 320,
    imageUrl: 'public/img/room4.png',
    badge: 'Gastos Incluidos',
  },
]);