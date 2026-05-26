const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    ...options.headers,
  };

  if (options.recaptcha) {
    headers["x-recaptcha-token"] = options.recaptcha;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    headers,
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

export async function getAppAdsTxt() {
  const response = await fetch(`${API_BASE}/site/app-ads-txt`);
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

export function getAdminItems(collection, token) {
  return apiRequest(`/admin/${collection}/items`, { token });
}

export function createAdminItem(collection, payload, token) {
  return apiRequest(`/admin/${collection}/items`, {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export function updateAdminItem(collection, id, payload, token) {
  return apiRequest(`/admin/${collection}/items/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(payload),
  });
}

export function deleteAdminItem(collection, id, token) {
  return apiRequest(`/admin/${collection}/items/${id}`, {
    method: "DELETE",
    token,
  });
}

export function getCustomPages(token) {
  return apiRequest("/admin/pages", { token });
}

export function createCustomPage(payload, token) {
  return apiRequest("/admin/pages", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export function updateCustomPage(id, payload, token) {
  return apiRequest(`/admin/pages/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(payload),
  });
}

export function deleteCustomPage(id, token) {
  return apiRequest(`/admin/pages/${id}`, {
    method: "DELETE",
    token,
  });
}

export function getPublicPage(slug) {
  return apiRequest(`/site/pages/${slug}`);
}
