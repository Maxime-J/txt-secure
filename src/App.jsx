import { createBrowserRouter, RouterProvider } from 'react-router';

import Layout from './Layout';
import { Home, NewMessage, ViewMessage, FromServer } from './pages';
import Error from 'components/Error';

import {
  getBackground,
  getMessage,
  getContent,
} from 'utils/api';

const loaders = {
  background: () => getBackground(),
  message: ({ params }) => getMessage(params.id),
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
      { path: '/nouveau', element: <NewMessage /> },
      { path: '/a-propos', handle: { showHome: true }, ...serverRoute },
      { path: '/conditions', handle: { showHome: true }, ...serverRoute },
      { path: '/:id', loader: loaders.message, element: <ViewMessage /> },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
