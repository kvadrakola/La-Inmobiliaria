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
    amenities: ['Wifi incluido', 'Calefacción', 'Habitación amueblada', 'Limpieza semanal'],
  },
  {
    id: 2,
    title: 'Estudio en Moncloa',
    description: 'Estudio completo cerca de la universidad. Ideal para estudiantes de intercambio.',
    price: 550,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    badge: 'Gastos Incluidos',
    petRestriction: '🐾 Prohibido Mascotas',
    amenities: ['Cocina equipada', 'Cerca de universidad', 'Baño privado', 'Ascensor'],
  },
  {
    id: 3,
    title: 'Piso Compartido Chamberí',
    description: 'Habitación en piso compartido con 3 estudiantes. Ambiente internacional y acogedor.',
    price: 380,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    badge: 'Gastos Incluidos',
    smokingRestriction: '🚭 Prohibido Fumar',
    amenities: ['Piso compartido', 'Ambiente internacional', 'Wifi incluido', 'Lavadora'],
  },
  {
    id: 4,
    title: 'Piso Compartido en el centro',
    description: 'Habitación en piso compartido con 5 estudiantes. Cerca del Ayuntamiento.',
    price: 320,
    imageUrl: 'public/img/room4.png',
    badge: 'Gastos Incluidos',
    smokingRestriction: '🚭 Prohibido Fumar',
    amenities: ['Cerca del centro', 'Salón compartido', 'Calefacción', 'Amueblado'],
  },
    {
    id: 5,
    title: 'Piso Cerca de la Estación de Tren',
    description: 'Habitación en piso compartido con 3 estudiantes.',
    price: 300,
    imageUrl: 'public/img/rooms5.png',
    badge: 'Gastos Incluidos',
    petRestriction: '🐾 Prohibido Mascotas',
    amenities: ['Cerca de la estación', 'Habitación luminosa', 'Cocina equipada', 'Wifi incluido'],
  },
    {
    id: 6,
    title: 'Piso Compartido deluxe',
    description: 'Habitación en piso compartido con 4 estudiantes.',
    price: 580,
    imageUrl: 'public/img/rooms6.png',
    badge: 'Gastos Incluidos',
    amenities: ['Piso compartido', 'Terraza', 'Calefacción', 'Amueblado'],
  },
     {
    id: 7,
    title: 'Loft con litera y zona de estudio',
    description: 'Estancia luminosa con litera de madera, escritorio integrado y cocina abierta.',
    price: 360,
    imageUrl: '/img/room7.png',
    badge: 'Gastos Incluidos',
    amenities: ['Litera de madera', 'Escritorio integrado', 'Cocina abierta', 'Ventana exterior'],
    petRestriction: '🐾 Prohibido Mascotas',
  },
     {
    id: 8,
    title: 'Dormitorio con vistas a la ciudad',
    description: 'Dormitorio amplio y elegante con cama doble, grandes ventanales y mucha luz natural.',
    price: 550,
    imageUrl: '/img/room8.png',
    badge: 'Gastos Incluidos',
    amenities: ['Cama doble', 'Grandes ventanales', 'Armario auxiliar', 'Vistas despejadas'],
  },
     {
    id: 9,
    title: 'Loft industrial con dos alturas',
    description: 'Loft de estilo industrial con dos camas, zona de trabajo y amplios ventanales urbanos.',
    price: 300,
    imageUrl: '/img/room9.png',
    badge: 'Gastos Incluidos',
    amenities: ['Dos alturas', 'Zona de trabajo', 'Ventanales amplios', 'Techo de madera'],
    smokingRestriction: '🚭 Prohibido Fumar',
  },
     {
    id: 10,
    title: 'Habitación con cama abatible',
    description: 'Habitación funcional con cama doble integrada, armarios a medida y espacio optimizado.',
    price: 320,
    imageUrl: '/img/room10.png',
    badge: 'Gastos Incluidos',
    amenities: ['Cama integrada', 'Armarios a medida', 'Escritorio', 'Balcón exterior'],
  },
     {
    id: 11,
    title: 'Habitación loft con cocina integrada',
    description: 'Espacio compacto y luminoso con cama elevada, cocina integrada y calefacción.',
    price: 350,
    imageUrl: '/img/room11.png',
    badge: 'Gastos Incluidos',
    amenities: ['Cama elevada', 'Cocina integrada', 'Armario empotrado', 'Calefacción'],
    smokingRestriction: '🚭 Prohibido Fumar',
  },
     {
    id: 12,
    title: 'Habitación luminosa con escritorio',
    description: 'Habitación acogedora con cama individual, escritorio amplio y decoración colorida.',
    price: 390,
    imageUrl: '/img/room12.png',
    badge: 'Gastos Incluidos',
    amenities: ['Escritorio amplio', 'Armario grande', 'Ventana exterior', 'Zona de estudio'],
    petRestriction: '🐾 Prohibido Mascotas',
  },
]);