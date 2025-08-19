import { createFileRoute } from '@tanstack/react-router';

import { pages } from 'locale.json';

// Virtual file route: path generated from routes.js
export const Route = createFileRoute('/_server/a-propos')({
  staticData: {
    title: pages.about.title,
    showHome: true,
  },
});
