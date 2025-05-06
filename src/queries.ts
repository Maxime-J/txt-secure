import { queryOptions } from '@tanstack/react-query';

import { fetchApi } from 'utils/api';

import {
  BackgroundInfos,
  ShareCreationRequest,
  ShareCreationResponse,
  ShareData,
} from 'types';

export const backgroundQuery = queryOptions({
  queryKey: ['background'],
  queryFn: () => fetchApi<BackgroundInfos>('background'),
});

export const getContentQuery = (pathname: string) => queryOptions({
  queryKey: ['content', pathname],
  queryFn: () => fetchApi<string>(`content${pathname}`),
});

export const getShareQuery = (shareId: string) => queryOptions({
  queryKey: ['share', shareId],
  queryFn: () => fetchApi<ShareData>(`share/${shareId}`),
  gcTime: 0,
});

export const shareMutation = {
  mutationFn: async (data: ShareCreationRequest) => {
    const result = await fetchApi<ShareCreationResponse>('share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (result.error) throw new Error();
    return result;
  },
};
