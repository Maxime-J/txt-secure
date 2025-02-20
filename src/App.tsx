import { createBrowserRouter, LoaderFunction, RouterProvider } from 'react-router';

import Layout from './Layout';
import { FromServer, Home, NewShare, ViewShare } from './pages';
import Error from 'components/Error';

import { getBackground, getContent, getShare } from 'utils/api';

import strings from 'fr-locale';

const loaders: Record<string, LoaderFunction> = {
  background: () => getBackground(),
  share: ({ params }) => getShare(params.id!),
  content: ({ request }) => {
    const url = new URL(request.url);
    return getContent(url.pathname);
  },
};

const serverRoute = { loader: loaders.content, element: <FromServer /> };

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: loaders.background,
    HydrateFallback: () => null,
    children: [
      {
        path: '/',
        handle: { title: strings.routes.home.title },
        element: <Home />
      },
      {
        path: `/${strings.routes.newLink.slug}`,
        handle: { title: strings.routes.newLink.title },
        element: <NewShare />
      },
      {
        path: `/${strings.routes.about.slug}`,
        handle: { title: strings.routes.about.title, showHome: true },
        ...serverRoute
      },
      {
        path: `/${strings.routes.terms.slug}`,
        handle: { title: strings.routes.terms.title, showHome: true },
        ...serverRoute
      },
      {
        path: '/:id',
        loader: loaders.share,
        element: <ViewShare />
      },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
