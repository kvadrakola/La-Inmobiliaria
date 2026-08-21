import axios from 'axios';
import { API_BASE_URL, ORDERS_API_URL, HTTP_STATUS } from '../constants/app';

export const getMenuByCountry = async (country) => {
  const { data } = await axios.get(`${API_BASE_URL}/filter.php`, {
    params: { a: country },
  });
  return data.meals ?? [];
};

export const getMealDetail = async (idMeal) => {
  const { data } = await axios.get(`${API_BASE_URL}/lookup.php`, {
    params: { i: idMeal },
  });
  return data.meals?.[0] ?? null;
};

export const submitOrder = async (payload) => {
  if (!ORDERS_API_URL) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Pedido simulado:', payload);
        resolve({ ok: true, simulated: true });
      }, 400);
    });
  }

  const { data } = await axios.post(ORDERS_API_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  return data ?? {};
};

export const getAxiosErrorMessage = (error) => {
  if (!error) return 'Error desconocido';

  if (error.response) {
    const status = error.response.status;
    const serverMessage =
      typeof error.response.data === 'string'
        ? error.response.data
        : error.response.data?.message;

    if (status === HTTP_STATUS.NOT_FOUND) {
      return 'Recurso no encontrado.';
    }
    if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      return 'Error interno del servidor.';
    }

    return serverMessage || `Error del servidor (${status})`;
  }

  if (error.request) {
    return 'No se pudo contactar con el servidor.';
  }

  return error.message || 'Error inesperado al procesar la solicitud.';
};
