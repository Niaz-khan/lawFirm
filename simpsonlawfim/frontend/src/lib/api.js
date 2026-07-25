const BASE = '/api/v1';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = new Error(`API error: ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export function fetchPracticeAreas() {
  return request('/practice-areas/');
}

export function fetchPracticeArea(slug) {
  return request(`/practice-areas/${slug}/`);
}

export function fetchTeamMembers() {
  return request('/team/');
}

export function fetchTestimonials() {
  return request('/testimonials/');
}

export function fetchOffices() {
  return request('/offices/');
}

export function fetchPages() {
  return request('/pages/');
}

export function fetchPage(slug) {
  return request(`/pages/${slug}/`);
}

export function submitInquiry(data) {
  return request('/inquiries/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
