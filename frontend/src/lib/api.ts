// Central API base URL — reads from VITE_API_URL in production
// or falls back to localhost for development.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_BASE;
