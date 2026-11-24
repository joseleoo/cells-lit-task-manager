const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:5001/api/tasks';

export function getTasks() {
  return request('GET');
}

export function deleteTask(id) {
  return request('DELETE', id);
}

async function request(method, id) {
  const url = id === undefined ? API_BASE_URL : `${API_BASE_URL}/${id}`;
  const response = await fetch(url, { method });

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
