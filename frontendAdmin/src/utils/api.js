/**
 * Common API fetcher for Admin Panel.
 * Uses the /api proxy configured in vite.config.js.
 * Automatically attaches the JWT token from localStorage if available.
 */
export const callApi = async (path, options = {}) => {
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  
  const response = await fetch(`${baseUrl}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
};
