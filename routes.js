import {
  index,
  layout,
  rootRoute,
  route,
} from '@tanstack/virtual-file-routes';

import { pages } from './src/locale.json';

export const routes = rootRoute('root.tsx', [
  index('index.tsx'),
  route(pages.newLink.path, 'new.tsx'),
  layout('_server.tsx', [
    route(pages.about.path, '_server/about.ts'),
    route(pages.terms.path, '_server/terms.ts'),
  ]),
  route('/$shareId', 'view.tsx'),
]);
