// This is a frontend-only project. This module is a placeholder that mirrors
// the shape a real API client would have, so swapping in a backend later
// (REST, GraphQL, etc.) only touches this file plus the data layer.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, options = {}) {
  if (!BASE_URL) {
    throw new Error('No backend configured yet — NovaCart is currently running on local mock data.');
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
};
