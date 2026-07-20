import axios from 'axios';

// Base URL for the FitStitch backend (Express API). Set VITE_API_URL in
// .env once the backend from Phase 1 is deployed, e.g.
// VITE_API_URL=https://api.fitstitchboutique.com/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export async function submitContactEnquiry(payload) {
  // Expected backend route: POST /api/enquiries/contact
  return api.post('/enquiries/contact', payload);
}

export async function submitBusinessPartnerRequest(payload) {
  // Expected backend route: POST /api/enquiries/business-partner
  return api.post('/enquiries/business-partner', payload);
}

export default api;
