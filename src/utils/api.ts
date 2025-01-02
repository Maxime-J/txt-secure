import { version } from 'package.json';
import {
  BackgroundInfos,
  MessageCreationRequest,
  MessageCreationResponse,
  MessageData,
} from 'types';

const API_BASE = '/api/';

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  options.headers = {
    ...options.headers,
    'X-APP': version,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const contentType = response.headers.get('Content-Type')!;

  let result;

  if (contentType.includes('application/json')) {
    result = await response.json();
  } else if (contentType.includes('text/plain')) {
    result = await response.text();
  }

  return result;
};

export function getBackground(): Promise<BackgroundInfos> {
  return fetchApi('background');
};

export function getContent(pathname: string): Promise<string> {
  return fetchApi(`content${pathname}`);
}

export function getMessage(id: string): Promise<MessageData> {
  return fetchApi(`message/${id}`);
};

export function createMessage(data: MessageCreationRequest): Promise<MessageCreationResponse> {
  return fetchApi('message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
