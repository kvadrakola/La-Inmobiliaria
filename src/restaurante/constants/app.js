export const DEFAULT_COUNTRY = 'Colombia';

export const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const ORDERS_API_URL = (import.meta?.env?.VITE_ORDERS_API_URL || '/api/orders').trim();

export const UI = {
  pageTitle: 'Platos típicos de Colombia',
  pageDescription: 'Recetas colombianas obtenidas desde TheMealDB.',
  loadingMessage: 'Cargando platos de Colombia...',
  cartEmptyMessage: 'Tu pedido está vacío.',
  confirmOrderLabel: 'Confirmar pedido',
  clearCartLabel: 'Vaciar',
  retryLabel: 'Reintentar',
  inCartLabel: 'en pedido',
  removeLabel: 'Quitar',
  simulatedOrderMessage: 'Pedido simulado:',
  orderSentMessage: 'Pedido enviado correctamente.',
  orderErrorPrefix: 'No se pudo enviar el pedido: ',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  INTERNAL_SERVER_ERROR: 500,
};
