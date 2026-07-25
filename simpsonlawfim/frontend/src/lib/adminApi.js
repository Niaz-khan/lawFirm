const BASE = '/api/v1/admin';

function getToken() {
  return localStorage.getItem('admin_access');
}

function getRefresh() {
  return localStorage.getItem('admin_refresh');
}

export function setTokens(access, refresh) {
  localStorage.setItem('admin_access', access);
  localStorage.setItem('admin_refresh', refresh);
}

export function clearTokens() {
  localStorage.removeItem('admin_access');
  localStorage.removeItem('admin_refresh');
}

export function isLoggedIn() {
  return !!getToken();
}

async function adminRequest(path, options = {}) {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (res.status === 401 && getRefresh()) {
    const refreshRes = await fetch(`${BASE}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: getRefresh() }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      setTokens(data.access, data.refresh || getRefresh());
      headers.Authorization = `Bearer ${data.access}`;
      res = await fetch(`${BASE}${path}`, { ...options, headers });
    } else {
      clearTokens();
      throw new Error('Session expired');
    }
  }

  if (!res.ok) {
    const err = new Error(`API error: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  if (res.status === 204) return null;
  return res.json();
}

export function login(username, password) {
  return fetch(`${BASE}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }).then(async (res) => {
    if (!res.ok) throw new Error('Invalid credentials');
    const data = await res.json();
    setTokens(data.access, data.refresh);
    return data;
  });
}

export function fetchDashboard() {
  return adminRequest('/dashboard/');
}

export function fetchList(resource) {
  return adminRequest(`/${resource}/`);
}

export function fetchItem(resource, id) {
  return adminRequest(`/${resource}/${id}/`);
}

export function createItem(resource, data) {
  const isFormData = data instanceof FormData;
  return adminRequest(`/${resource}/`, {
    method: 'POST',
    ...(isFormData
      ? { body: data, headers: { Authorization: `Bearer ${getToken()}` } }
      : { body: JSON.stringify(data) }),
  });
}

export function updateItem(resource, id, data) {
  const isFormData = data instanceof FormData;
  return adminRequest(`/${resource}/${id}/`, {
    method: 'PATCH',
    ...(isFormData
      ? { body: data, headers: { Authorization: `Bearer ${getToken()}` } }
      : { body: JSON.stringify(data) }),
  });
}

export function deleteItem(resource, id) {
  return adminRequest(`/${resource}/${id}/`, { method: 'DELETE' });
}
