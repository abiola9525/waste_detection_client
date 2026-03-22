import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/',
  headers: {
    'ngrok-skip-browser-warning': '69420'
  }
});

export const getBinsStatus = async () => {
  const response = await api.get('bins/status/');
  return response.data;
};

export const getBinHistory = async (binId) => {
  const response = await api.get(`bins/${binId}/history/`);
  return response.data;
};

export const postTelemetry = async (binId, distance) => {
  const response = await api.post('telemetry/', {
    bin_id: binId,
    distance,
  });
  return response.data;
};

export default api;
