/**
 * mockData — Mock data that simulates API responses
 *
 * Replace this file with real API calls (fetch/axios) when the backend is ready.
 * Listing payload lives in listings.js (shared with propertyCatalog).
 */
import { LISTINGS } from './listings.js';

/**
 * @returns {Promise<Array>} List of properties
 */
export const fetchProperties = () => Promise.resolve(LISTINGS.map((listing) => ({ ...listing })));
