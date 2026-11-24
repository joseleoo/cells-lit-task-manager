const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:5001/api/tasks';

export function getTasks() {
  return request('GET');
}

export function createTask(title) {
  return request('POST', undefined, { title });
}

export function updateTask(id, title) {
  return request('PUT', id, { title });
}

export function completeTask(id) {
  debugger;
  return request('PATCH', `${id}/complete`);
}

export function uncompleteTask(id) {
  return request('PATCH', `${id}/uncomplete`);
}

export function deleteTask(id) {
  return request('DELETE', id);
}

async function request(method, path, body) {
  const url = path === undefined ? API_BASE_URL : `${API_BASE_URL}/${path}`;
  const response = await fetch(url, {
    method,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function readErrorMessage(response) {
  const payload = await response.text();

  if (!payload) {
    return `Request failed with status ${response.status}.`;
  }

  try {
    const problem = JSON.parse(payload);
    return problem.title || problem.error || `Request failed with status ${response.status}.`;
  } catch {
    return payload;
  }
}
