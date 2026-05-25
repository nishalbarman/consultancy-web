const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export function getSiteData() {
  return apiRequest("/site");
}

export async function getAdsTxt() {
  const response = await fetch(`${API_BASE}/site/ads-txt`);
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.text();
}

export async function getRobotsTxt() {
  const response = await fetch(`${API_BASE}/site/robots-txt`);
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.text();
}

export function createLead(payload) {
  return apiRequest("/messages/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function registerUser(payload) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getDashboard(token) {
  return apiRequest("/dashboard", { token });
}

export function createOrder(token, payload) {
  return apiRequest("/dashboard/orders", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}
