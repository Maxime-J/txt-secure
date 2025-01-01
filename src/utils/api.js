import { version } from 'package.json';

const API_BASE = '/api/';

async function fetchApi(endpoint, options = {}) {
  options.headers = {
    ...options.headers,
    'X-APP': version,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const contentType = response.headers.get('Content-Type');

  let result;

  if (contentType.includes('application/json')) {
    result = await response.json();
  } else if (contentType.includes('text/plain')) {
    result = await response.text();
  }

  return result;
};

export async function getBackground() {
  return fetchApi('background');
};

export async function getContent(pathname) {
  return fetchApi(`content${pathname}`);
}

export async function getMessage(id) {
  return fetchApi(`message/${id}`);
};

export async function createMessage(data){
  return fetchApi('message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
