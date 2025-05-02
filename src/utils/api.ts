import { version } from 'package.json';

const API_BASE = '/api/';

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  options.headers = {
    ...options.headers,
    'X-APP': version,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, options);

  // @ts-expect-error: correctly handled at runtime
  if (!response.ok) return null;

  const contentType = response.headers.get('Content-Type')!;

  let result;

  if (contentType.includes('application/json')) {
    result = await response.json();
  } else if (contentType.includes('text/plain')) {
    result = await response.text();
  }

  return result;
}
