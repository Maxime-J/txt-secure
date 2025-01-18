import { createBrowserRouter, LoaderFunction, RouterProvider } from 'react-router';

import Layout from './Layout';
import { FromServer, Home, NewShare, ViewShare } from './pages';
import Error from 'components/Error';

import { getBackground, getContent, getShare } from 'utils/api';

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
      { path: '/', element: <Home /> },
      { path: '/nouveau-lien', element: <NewShare /> },
      { path: '/a-propos', handle: { showHome: true }, ...serverRoute },
      { path: '/conditions', handle: { showHome: true }, ...serverRoute },
      { path: '/:id', loader: loaders.share, element: <ViewShare /> },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
