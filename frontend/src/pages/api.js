// src/api.js
const BASE = 'https://moveout.duckdns.org';

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...opts.headers
    },
    credentials: 'include'    // ← send & receive HttpOnly cookie
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}



export const login = passkey =>
  request('/login', {
    method: 'POST',
    body: JSON.stringify({ passkey })
  });

export const logout = () =>
  request('/logout', { method: 'POST' });

export const fetchData = () =>
  request('/data', { method: 'GET' });

export const fetchUsers = () =>
  request('/users', { method: 'GET' });


export const fetchScript = () =>
  request('/script', { method: 'GET' });
