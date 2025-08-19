import { createFileRoute } from '@tanstack/react-router';

import { pages } from 'locale.json';

// Virtual file route: path generated from routes.js
export const Route = createFileRoute('/_server/conditions')({
  staticData: {
    title: pages.terms.title,
    showHome: true,
  },
});
