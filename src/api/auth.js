import client from './client';

// Confirmed paths: baseurl/register/ and baseurl/login/
// Still confirm with backend: do these return JSON (DRF) now, or still render
// HTML templates? If it's still template views, these calls will get back
// HTML instead of JSON and .data will be a string, not an object with token/user.

export async function registerUser({ username, email, password, role }) {
  const { data } = await client.post('/register/', { username, email, password, role });
  return data;
}

export async function loginUser({ email, password }) {
  const { data } = await client.post('/login/', { email, password });
  return data; // expected shape: { token: '...', user: { id, username, role } }
}

